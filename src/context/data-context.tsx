'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  DatasetMeta,
  ActiveTab,
  ChatMessage,
  UserProfile,
  ThemeMode,
  SoftwareIntegration,
  SoftwareProviderId,
} from '@/types';
import { DEMO_DATA, DEMO_DATASET_NAME } from '@/lib/demo-data';
import { analyzeDataset, answerDataQuestion } from '@/lib/data-analyzer';
import { AVAILABLE_SOFTWARE, generateSoftwareSyncedData } from '@/lib/software-integrations';

interface DataContextType {
  dataset: DatasetMeta | null;
  rows: Record<string, any>[];
  analysis: ReturnType<typeof analyzeDataset> | null;
  isLoading: boolean;
  error: string | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  loadDemoData: () => void;
  handleFileUpload: (file: File) => Promise<boolean>;
  clearData: () => void;
  chatMessages: ChatMessage[];
  askQuestion: (question: string) => Promise<void>;
  user: UserProfile;
  login: (email: string, name?: string, company?: string, softwareToSync?: SoftwareProviderId) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  softwareList: SoftwareIntegration[];
  selectedSoftwareForPermission: SoftwareIntegration | null;
  isSoftwarePermissionOpen: boolean;
  openSoftwarePermission: (software: SoftwareIntegration) => void;
  closeSoftwarePermission: () => void;
  syncSoftwareData: (software: SoftwareIntegration) => Promise<void>;
}

const defaultUser: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex@newtech.io',
  company: 'Apex Retail',
  role: 'Business Lead',
  isAuthenticated: false,
  isDemo: true,
  linkedSoftware: [],
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [dataset, setDataset] = useState<DatasetMeta | null>(null);
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeDataset> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [theme, setThemeState] = useState<ThemeMode>('light');

  // Software integration state
  const [softwareList, setSoftwareList] = useState<SoftwareIntegration[]>(AVAILABLE_SOFTWARE);
  const [selectedSoftwareForPermission, setSelectedSoftwareForPermission] = useState<SoftwareIntegration | null>(null);
  const [isSoftwarePermissionOpen, setIsSoftwarePermissionOpen] = useState(false);

  // Initialize Theme & User
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('nud_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedTheme = localStorage.getItem('nud_theme') as ThemeMode;
      if (savedTheme) {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
      }
    } catch {
      // Ignore storage errors
    }
    loadDemoData();
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'light') {
      root.classList.remove('dark');
    } else {
      // System
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    applyTheme(mode);
    try {
      localStorage.setItem('nud_theme', mode);
    } catch {}
  };

  const loadDemoData = () => {
    setIsLoading(true);
    setError(null);
    try {
      const analyzed = analyzeDataset(DEMO_DATA);
      setRows(DEMO_DATA);
      setAnalysis(analyzed);
      setDataset({
        id: 'demo-retail-2024',
        name: DEMO_DATASET_NAME,
        sizeBytes: 14200,
        rowCount: DEMO_DATA.length,
        columnCount: Object.keys(DEMO_DATA[0] || {}).length,
        uploadedAt: new Date().toISOString(),
        type: 'demo',
      });

      // Initialize welcome chat message
      setChatMessages([
        {
          id: 'welcome-msg',
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Hello! I've loaded your **${DEMO_DATASET_NAME}** dataset. You can ask me any question about your sales, products, top performers, or growth trends. Try asking: "What are my top 5 products?"`,
        },
      ]);
    } catch (err: any) {
      setError(err?.message || 'Failed to process demo dataset.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setDataset(null);
    setRows([]);
    setAnalysis(null);
    setChatMessages([]);
  };

  const handleFileUpload = async (file: File): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // Validate size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      setError('File is too large. Maximum supported size for MVP is 25MB.');
      setIsLoading(false);
      return false;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (fileExt !== 'csv' && fileExt !== 'xlsx' && fileExt !== 'xls') {
      setError('Unsupported file type. Please upload a CSV or Excel (.xlsx, .xls) file.');
      setIsLoading(false);
      return false;
    }

    try {
      let parsedRows: Record<string, any>[] = [];

      if (fileExt === 'csv') {
        const text = await file.text();
        const result = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });

        if (result.errors && result.errors.length > 0 && result.data.length === 0) {
          throw new Error('Could not parse CSV file. Please verify row format.');
        }
        parsedRows = result.data as Record<string, any>[];
      } else {
        // Excel file parsing
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          throw new Error('Excel workbook contains no sheets.');
        }
        const worksheet = workbook.Sheets[firstSheetName];
        parsedRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      }

      if (parsedRows.length === 0) {
        throw new Error('The uploaded file appears to be empty or has no readable records.');
      }

      const analyzed = analyzeDataset(parsedRows);

      setRows(parsedRows);
      setAnalysis(analyzed);
      setDataset({
        id: `upload-${Date.now()}`,
        name: file.name,
        sizeBytes: file.size,
        rowCount: parsedRows.length,
        columnCount: Object.keys(parsedRows[0] || {}).length,
        uploadedAt: new Date().toISOString(),
        type: fileExt === 'csv' ? 'csv' : 'xlsx',
      });

      // Update chat messages with context
      setChatMessages([
        {
          id: `chat-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Successfully analyzed **${file.name}** with **${parsedRows.length} rows** and **${Object.keys(parsedRows[0] || {}).length} columns**! What would you like to know about your data?`,
        },
      ]);

      return true;
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze uploaded file.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const openSoftwarePermission = (software: SoftwareIntegration) => {
    setSelectedSoftwareForPermission(software);
    setIsSoftwarePermissionOpen(true);
  };

  const closeSoftwarePermission = () => {
    setSelectedSoftwareForPermission(null);
    setIsSoftwarePermissionOpen(false);
  };

  // Sync data from linked business software after user permission
  const syncSoftwareData = async (software: SoftwareIntegration) => {
    setIsLoading(true);
    try {
      const syncedRows = generateSoftwareSyncedData(software.id, user.email);
      const analyzed = analyzeDataset(syncedRows);

      setRows(syncedRows);
      setAnalysis(analyzed);
      setDataset({
        id: `soft-${software.id}-${Date.now()}`,
        name: `${software.name} (Live Sync)`,
        sizeBytes: syncedRows.length * 120,
        rowCount: syncedRows.length,
        columnCount: Object.keys(syncedRows[0] || {}).length,
        uploadedAt: new Date().toISOString(),
        type: 'software',
        sourceSoftware: software.name,
      });

      // Update software status in list
      setSoftwareList((prev) =>
        prev.map((s) =>
          s.id === software.id
            ? { ...s, status: 'connected', lastSyncedAt: 'Just now' }
            : s
        )
      );

      // Update user linked software list
      const updatedLinked = Array.from(new Set([...(user.linkedSoftware || []), software.name]));
      const updatedUser = { ...user, linkedSoftware: updatedLinked };
      setUser(updatedUser);
      try {
        localStorage.setItem('nud_user', JSON.stringify(updatedUser));
      } catch {}

      // Update Chat assistant
      setChatMessages([
        {
          id: `soft-msg-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Successfully connected to **${software.name}**! I've fetched **${syncedRows.length} live records** with full read-only permissions. You can now explore your sales trends or ask questions like *"What is my total sales?"* or *"What are my top products?"*.`,
        },
      ]);
    } catch (err: any) {
      setError(err?.message || `Failed to fetch data from ${software.name}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const askQuestion = async (question: string) => {
    if (!question.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text: question.trim(),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // If analysis is available, use local instant engine (or query server API)
    if (analysis) {
      try {
        let aiResult: any = null;
        try {
          const res = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question,
              datasetSummary: {
                kpis: analysis.kpis,
                topProducts: analysis.topProducts,
                categories: analysis.categories,
                timeSeries: analysis.timeSeries,
                qualityScore: analysis.qualityReport.score,
                sourceSoftware: dataset?.sourceSoftware,
              },
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.text) {
              aiResult = data;
            }
          }
        } catch {
          // Fallback to local analytical engine
        }

        const fallback = answerDataQuestion(question, analysis);
        const finalAnswer = aiResult || fallback;

        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: finalAnswer.text,
          chart: finalAnswer.chart || fallback.chart,
          metrics: finalAnswer.metrics || fallback.metrics,
        };

        setChatMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const errorMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: "I couldn't process that question right now. Try asking: 'What are my top 5 products?' or 'Show my sales trend'.",
        };
        setChatMessages((prev) => [...prev, errorMsg]);
      }
    } else {
      const noDataMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        timestamp: 'Just now',
        text: 'Please upload a dataset or click **Try Demo Data** first so I can analyze your figures.',
      };
      setChatMessages((prev) => [...prev, noDataMsg]);
    }
  };

  const login = (
    email: string,
    name?: string,
    company?: string,
    softwareToSync?: SoftwareProviderId
  ) => {
    const updated: UserProfile = {
      name: name || email.split('@')[0] || 'Business User',
      email,
      company: company || 'My Company',
      role: 'Business Owner',
      isAuthenticated: true,
      isDemo: false,
      linkedSoftware: user.linkedSoftware || [],
    };
    setUser(updated);
    try {
      localStorage.setItem('nud_user', JSON.stringify(updated));
    } catch {}
    setIsAuthModalOpen(false);

    // If customer opted to sync from software during signup/login, prompt permission modal!
    if (softwareToSync) {
      const match = softwareList.find((s) => s.id === softwareToSync);
      if (match) {
        setTimeout(() => {
          openSoftwarePermission(match);
        }, 300);
      }
    }
  };

  const logout = () => {
    setUser({ ...defaultUser, isAuthenticated: false, isDemo: true });
    try {
      localStorage.removeItem('nud_user');
    } catch {}
  };

  return (
    <DataContext.Provider
      value={{
        dataset,
        rows,
        analysis,
        isLoading,
        error,
        activeTab,
        setActiveTab,
        loadDemoData,
        handleFileUpload,
        clearData,
        chatMessages,
        askQuestion,
        user,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        theme,
        setTheme,
        softwareList,
        selectedSoftwareForPermission,
        isSoftwarePermissionOpen,
        openSoftwarePermission,
        closeSoftwarePermission,
        syncSoftwareData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
