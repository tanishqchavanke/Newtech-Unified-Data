export type ColumnType = 'number' | 'currency' | 'date' | 'category' | 'string';

export interface DataColumn {
  name: string;
  type: ColumnType;
  sampleValues: (string | number)[];
  nullCount: number;
  uniqueCount: number;
  totalCount: number;
  min?: number;
  max?: number;
  avg?: number;
}

export interface DataQualityReport {
  score: number; // 0 to 100
  status: 'Excellent' | 'Good' | 'Fair' | 'Needs Review';
  summary: string;
  totalRows: number;
  totalColumns: number;
  missingValues: number;
  duplicateRows: number;
  invalidValues: number;
  detectedColumns: DataColumn[];
  suggestions: string[];
}

export interface BusinessKPIs {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  growthRate: number; // Percentage, e.g. +14.2%
  averageOrderValue: number;
  topProduct: { name: string; revenue: number; quantity: number };
  topCategory: { name: string; revenue: number };
  topRegion: { name: string; revenue: number };
}

export interface TimeSeriesPoint {
  period: string;
  revenue: number;
  orders: number;
}

export interface ProductPerformancePoint {
  product: string;
  revenue: number;
  quantity: number;
  category: string;
}

export interface CategoryBreakdownPoint {
  category: string;
  revenue: number;
  percentage: number;
  color?: string;
}

export interface RegionPerformancePoint {
  region: string;
  revenue: number;
  orders: number;
}

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  category: 'growth' | 'best-seller' | 'trend' | 'attention';
  impact: 'positive' | 'neutral' | 'warning';
  metricHighlight?: string;
  chartData?: any[];
  chartType?: 'bar' | 'line' | 'metric';
}

export interface DatasetMeta {
  id: string;
  name: string;
  sizeBytes: number;
  rowCount: number;
  columnCount: number;
  uploadedAt: string;
  type: 'demo' | 'csv' | 'xlsx' | 'software';
  sourceSoftware?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  chart?: {
    type: 'bar' | 'line' | 'pie';
    title: string;
    data: any[];
    xKey: string;
    yKey: string;
    formatAsCurrency?: boolean;
  };
  metrics?: { label: string; value: string }[];
}

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  isAuthenticated: boolean;
  isDemo: boolean;
  linkedSoftware?: string[];
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type SoftwareProviderId =
  | 'shopify'
  | 'zohobooks'
  | 'stripe'
  | 'quickbooks'
  | 'woocommerce'
  | 'googlesheets';

export interface SoftwareIntegration {
  id: SoftwareProviderId;
  name: string;
  category: string;
  tagline: string;
  color: string;
  recordsDescription: string;
  permissionsRequired: string[];
  status: 'disconnected' | 'connecting' | 'connected';
  lastSyncedAt?: string;
  sampleRecordCount: number;
}

export type ActiveTab = 'overview' | 'data' | 'insights' | 'ask' | 'reports' | 'pricing' | 'settings';

