import { SoftwareIntegration, SoftwareProviderId } from '@/types';

export const AVAILABLE_SOFTWARE: SoftwareIntegration[] = [
  {
    id: 'shopify',
    name: 'Shopify Store',
    category: 'E-Commerce Platform',
    tagline: 'Auto-sync online orders, products, and customer GMV',
    color: '#96BF48',
    recordsDescription: 'Live orders, product sales, discount codes & buyer geography',
    permissionsRequired: [
      'Read-only access to completed orders & historical sales',
      'Read-only access to product inventory & SKU categories',
      'Read-only access to customer transaction aggregates',
      'Zero write permissions: N.U.D will never alter your store data',
    ],
    status: 'disconnected',
    sampleRecordCount: 156,
  },
  {
    id: 'zohobooks',
    name: 'Zoho Books',
    category: 'Accounting & Invoicing',
    tagline: 'Auto-fetch paid invoices, client billings, and revenue streams',
    color: '#F44336',
    recordsDescription: 'Invoices, payment status, tax summaries & client spend',
    permissionsRequired: [
      'Read-only access to customer invoices and credit notes',
      'Read-only access to chart of accounts sales entries',
      'Encrypted read-only token refreshed automatically',
      'Zero access to bank credentials or payment gateways',
    ],
    status: 'disconnected',
    sampleRecordCount: 142,
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    category: 'Payment Processor',
    tagline: 'Auto-sync payment charges, subscriptions, and net volume',
    color: '#635BFF',
    recordsDescription: 'Charges, payment methods, regional currency & gross revenue',
    permissionsRequired: [
      'Read-only access to charges and payment intent aggregates',
      'Read-only access to customer subscriptions and dispute rates',
      'Restricted read-only API key with zero payout capability',
      'TLS 1.3 encrypted data transmission',
    ],
    status: 'disconnected',
    sampleRecordCount: 184,
  },
  {
    id: 'quickbooks',
    name: 'Intuit QuickBooks',
    category: 'Bookkeeping & Retail',
    tagline: 'Sync general ledger sales, customer invoices, and margins',
    color: '#2CA01C',
    recordsDescription: 'Sales receipts, itemized invoices & regional accounts',
    permissionsRequired: [
      'Read-only access to sales transactions & invoice registers',
      'Read-only customer balances & product line items',
      'Certified OAuth2 authentication flow',
      'Zero capability to create, edit, or delete accounting ledger entries',
    ],
    status: 'disconnected',
    sampleRecordCount: 128,
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'WordPress E-Commerce',
    tagline: 'Auto-sync store checkouts, product lines, and shipping regions',
    color: '#96588A',
    recordsDescription: 'WordPress store transactions, item quantities & customer data',
    permissionsRequired: [
      'Read-only consumer key access to orders endpoint',
      'Read-only access to WooCommerce product categories',
      'Zero file or server write access',
    ],
    status: 'disconnected',
    sampleRecordCount: 110,
  },
  {
    id: 'googlesheets',
    name: 'Google Sheets',
    category: 'Cloud Spreadsheets',
    tagline: 'Auto-sync live connected Google Sheets workbook rows',
    color: '#0F9D58',
    recordsDescription: 'Live synced spreadsheet columns, custom sheets & records',
    permissionsRequired: [
      'Read-only access to selected Google Drive spreadsheet',
      'Explicit sheet permission consent prompt',
      'Zero access to personal Google Drive documents',
    ],
    status: 'disconnected',
    sampleRecordCount: 95,
  },
];

// Generate realistic dataset synced from a specific software
export function generateSoftwareSyncedData(providerId: SoftwareProviderId, email: string): Record<string, any>[] {
  const companySlug = email.split('@')[0] || 'Business';

  switch (providerId) {
    case 'shopify':
      return [
        { Date: '2024-01-04', OrderID: 'SH-1001', Product: 'Pro Wireless Earbuds', Category: 'Audio', Quantity: 2, Price: 3499, Revenue: 6998, Customer: 'Aditi Varma', Region: 'North', Source: 'Shopify' },
        { Date: '2024-01-09', OrderID: 'SH-1002', Product: 'UltraFlow Mechanical Keyboard', Category: 'Peripherals', Quantity: 1, Price: 5999, Revenue: 5999, Customer: 'Rahul Namboodiri', Region: 'South', Source: 'Shopify' },
        { Date: '2024-01-14', OrderID: 'SH-1003', Product: 'Ergonomic Desk Mat XXL', Category: 'Accessories', Quantity: 3, Price: 1299, Revenue: 3897, Customer: 'Suresh Raina', Region: 'West', Source: 'Shopify' },
        { Date: '2024-01-19', OrderID: 'SH-1004', Product: '4K Creator Monitor 27"', Category: 'Displays', Quantity: 1, Price: 38000, Revenue: 38000, Customer: 'Kavita Chawla', Region: 'East', Source: 'Shopify' },
        { Date: '2024-01-25', OrderID: 'SH-1005', Product: 'MagSafe Fast Charging Station', Category: 'Accessories', Quantity: 4, Price: 2999, Revenue: 11996, Customer: 'Deepak Bajaj', Region: 'North', Source: 'Shopify' },
        { Date: '2024-02-02', OrderID: 'SH-1006', Product: 'Pro Wireless Earbuds', Category: 'Audio', Quantity: 3, Price: 3499, Revenue: 10497, Customer: 'Priya Hegde', Region: 'South', Source: 'Shopify' },
        { Date: '2024-02-08', OrderID: 'SH-1007', Product: 'Aluminum Laptop Stand 360', Category: 'Accessories', Quantity: 5, Price: 2199, Revenue: 10995, Customer: 'Manish Sisodia', Region: 'West', Source: 'Shopify' },
        { Date: '2024-02-15', OrderID: 'SH-1008', Product: '4K Creator Monitor 27"', Category: 'Displays', Quantity: 2, Price: 38000, Revenue: 76000, Customer: 'Sneha Bose', Region: 'East', Source: 'Shopify' },
        { Date: '2024-02-21', OrderID: 'SH-1009', Product: 'UltraFlow Mechanical Keyboard', Category: 'Peripherals', Quantity: 2, Price: 5999, Revenue: 11998, Customer: 'Harish Goel', Region: 'North', Source: 'Shopify' },
        { Date: '2024-02-28', OrderID: 'SH-1010', Product: 'Titanium Smart Ring', Category: 'Wearables', Quantity: 1, Price: 18999, Revenue: 18999, Customer: 'Amit Trivedi', Region: 'West', Source: 'Shopify' },
        { Date: '2024-03-05', OrderID: 'SH-1011', Product: '4K Creator Monitor 27"', Category: 'Displays', Quantity: 3, Price: 38000, Revenue: 114000, Customer: 'Rohan Deshmukh', Region: 'West', Source: 'Shopify' },
        { Date: '2024-03-12', OrderID: 'SH-1012', Product: 'Pro Wireless Earbuds', Category: 'Audio', Quantity: 6, Price: 3499, Revenue: 20994, Customer: 'Ananya Sridhar', Region: 'South', Source: 'Shopify' },
        { Date: '2024-03-19', OrderID: 'SH-1013', Product: 'MagSafe Fast Charging Station', Category: 'Accessories', Quantity: 3, Price: 2999, Revenue: 8997, Customer: 'Vijay Mallya', Region: 'North', Source: 'Shopify' },
        { Date: '2024-03-27', OrderID: 'SH-1014', Product: 'Titanium Smart Ring', Category: 'Wearables', Quantity: 2, Price: 18999, Revenue: 37998, Customer: 'Kiran Bedi', Region: 'East', Source: 'Shopify' },
        { Date: '2024-04-04', OrderID: 'SH-1015', Product: '4K Creator Monitor 27"', Category: 'Displays', Quantity: 4, Price: 38000, Revenue: 152000, Customer: 'Sanjay Dutt', Region: 'West', Source: 'Shopify' },
        { Date: '2024-04-12', OrderID: 'SH-1016', Product: 'UltraFlow Mechanical Keyboard', Category: 'Peripherals', Quantity: 5, Price: 5999, Revenue: 29995, Customer: 'Gaurav Gill', Region: 'North', Source: 'Shopify' },
        { Date: '2024-04-20', OrderID: 'SH-1017', Product: 'Pro Wireless Earbuds', Category: 'Audio', Quantity: 4, Price: 3499, Revenue: 13996, Customer: 'Nisha Pillai', Region: 'South', Source: 'Shopify' },
        { Date: '2024-04-28', OrderID: 'SH-1018', Product: 'Aluminum Laptop Stand 360', Category: 'Accessories', Quantity: 8, Price: 2199, Revenue: 17592, Customer: 'Devendra Dave', Region: 'East', Source: 'Shopify' },
        { Date: '2024-05-06', OrderID: 'SH-1019', Product: '4K Creator Monitor 27"', Category: 'Displays', Quantity: 5, Price: 38000, Revenue: 190000, Customer: 'Vikram Seth', Region: 'West', Source: 'Shopify' },
        { Date: '2024-05-15', OrderID: 'SH-1020', Product: 'Titanium Smart Ring', Category: 'Wearables', Quantity: 3, Price: 18999, Revenue: 56997, Customer: 'Aarav Patel', Region: 'North', Source: 'Shopify' },
        { Date: '2024-05-24', OrderID: 'SH-1021', Product: 'MagSafe Fast Charging Station', Category: 'Accessories', Quantity: 6, Price: 2999, Revenue: 17994, Customer: 'Tanvi Shinde', Region: 'West', Source: 'Shopify' },
        { Date: '2024-06-03', OrderID: 'SH-1022', Product: '4K Creator Monitor 27"', Category: 'Displays', Quantity: 6, Price: 38000, Revenue: 228000, Customer: 'Kunal Nayyar', Region: 'East', Source: 'Shopify' },
        { Date: '2024-06-12', OrderID: 'SH-1023', Product: 'Pro Wireless Earbuds', Category: 'Audio', Quantity: 8, Price: 3499, Revenue: 27992, Customer: 'Maya Alagh', Region: 'South', Source: 'Shopify' },
        { Date: '2024-06-21', OrderID: 'SH-1024', Product: 'Titanium Smart Ring', Category: 'Wearables', Quantity: 4, Price: 18999, Revenue: 75996, Customer: 'Pooja Bhatt', Region: 'North', Source: 'Shopify' },
      ];

    case 'zohobooks':
      return [
        { Date: '2024-01-06', InvoiceNo: 'INV-ZB-201', Client: 'Apex Digital Solutions', Service: 'Cloud Architecture Retainer', Category: 'Consulting', Hours: 20, Rate: 5000, Revenue: 100000, PaymentStatus: 'Paid', Region: 'West', Source: 'Zoho Books' },
        { Date: '2024-01-15', InvoiceNo: 'INV-ZB-202', Client: 'Zenith Logistics Ltd', Service: 'Supply Chain Integration', Category: 'Enterprise Dev', Hours: 35, Rate: 6500, Revenue: 227500, PaymentStatus: 'Paid', Region: 'North', Source: 'Zoho Books' },
        { Date: '2024-01-24', InvoiceNo: 'INV-ZB-203', Client: 'Crestfield Retailers', Service: 'POS Modernization Support', Category: 'Maintenance', Hours: 15, Rate: 3500, Revenue: 52500, PaymentStatus: 'Paid', Region: 'South', Source: 'Zoho Books' },
        { Date: '2024-02-04', InvoiceNo: 'INV-ZB-204', Client: 'Apex Digital Solutions', Service: 'Cloud Architecture Retainer', Category: 'Consulting', Hours: 25, Rate: 5000, Revenue: 125000, PaymentStatus: 'Paid', Region: 'West', Source: 'Zoho Books' },
        { Date: '2024-02-18', InvoiceNo: 'INV-ZB-205', Client: 'BlueStone Media', Service: 'Security Audit & Compliance', Category: 'Cybersecurity', Hours: 40, Rate: 7000, Revenue: 280000, PaymentStatus: 'Paid', Region: 'East', Source: 'Zoho Books' },
        { Date: '2024-03-02', InvoiceNo: 'INV-ZB-206', Client: 'Zenith Logistics Ltd', Service: 'Supply Chain Integration Phase 2', Category: 'Enterprise Dev', Hours: 45, Rate: 6500, Revenue: 292500, PaymentStatus: 'Paid', Region: 'North', Source: 'Zoho Books' },
        { Date: '2024-03-15', InvoiceNo: 'INV-ZB-207', Client: 'Crestfield Retailers', Service: 'POS Modernization Support', Category: 'Maintenance', Hours: 20, Rate: 3500, Revenue: 70000, PaymentStatus: 'Paid', Region: 'South', Source: 'Zoho Books' },
        { Date: '2024-04-05', InvoiceNo: 'INV-ZB-208', Client: 'Apex Digital Solutions', Service: 'Cloud Architecture Retainer', Category: 'Consulting', Hours: 30, Rate: 5000, Revenue: 150000, PaymentStatus: 'Paid', Region: 'West', Source: 'Zoho Books' },
        { Date: '2024-04-20', InvoiceNo: 'INV-ZB-209', Client: 'Horizon HealthTech', Service: 'HIPAA Cloud Infrastructure', Category: 'Healthcare IT', Hours: 50, Rate: 8000, Revenue: 400000, PaymentStatus: 'Paid', Region: 'South', Source: 'Zoho Books' },
        { Date: '2024-05-08', InvoiceNo: 'INV-ZB-210', Client: 'BlueStone Media', Service: 'Security Audit & Compliance', Category: 'Cybersecurity', Hours: 35, Rate: 7000, Revenue: 245000, PaymentStatus: 'Paid', Region: 'East', Source: 'Zoho Books' },
        { Date: '2024-05-22', InvoiceNo: 'INV-ZB-211', Client: 'Zenith Logistics Ltd', Service: 'Warehouse Automation APIs', Category: 'Enterprise Dev', Hours: 40, Rate: 6500, Revenue: 260000, PaymentStatus: 'Paid', Region: 'North', Source: 'Zoho Books' },
        { Date: '2024-06-05', InvoiceNo: 'INV-ZB-212', Client: 'Horizon HealthTech', Service: 'HIPAA Cloud Infrastructure', Category: 'Healthcare IT', Hours: 55, Rate: 8000, Revenue: 440000, PaymentStatus: 'Paid', Region: 'South', Source: 'Zoho Books' },
        { Date: '2024-06-18', InvoiceNo: 'INV-ZB-213', Client: 'Apex Digital Solutions', Service: 'Cloud Architecture Retainer', Category: 'Consulting', Hours: 35, Rate: 5000, Revenue: 175000, PaymentStatus: 'Paid', Region: 'West', Source: 'Zoho Books' },
      ];

    case 'stripe':
      return [
        { Date: '2024-01-05', ChargeID: 'ch_101', Plan: 'SaaS Pro Monthly', Category: 'Subscriptions', Amount: 4999, Revenue: 4999, Customer: 'UrbanNest Studio', Region: 'West', Source: 'Stripe' },
        { Date: '2024-01-12', ChargeID: 'ch_102', Plan: 'SaaS Enterprise Annual', Category: 'Annual Licenses', Amount: 149000, Revenue: 149000, Customer: 'TechnoGrid Inc', Region: 'North', Source: 'Stripe' },
        { Date: '2024-01-20', ChargeID: 'ch_103', Plan: 'API Addon Pack', Category: 'Usage Credits', Amount: 12000, Revenue: 12000, Customer: 'GrowthWave Labs', Region: 'South', Source: 'Stripe' },
        { Date: '2024-02-05', ChargeID: 'ch_104', Plan: 'SaaS Pro Monthly', Category: 'Subscriptions', Amount: 9998, Revenue: 9998, Customer: 'UrbanNest Studio', Region: 'West', Source: 'Stripe' },
        { Date: '2024-02-14', ChargeID: 'ch_105', Plan: 'SaaS Enterprise Annual', Category: 'Annual Licenses', Amount: 149000, Revenue: 149000, Customer: 'OmniTrade Corp', Region: 'East', Source: 'Stripe' },
        { Date: '2024-03-05', ChargeID: 'ch_106', Plan: 'SaaS Pro Monthly', Category: 'Subscriptions', Amount: 14997, Revenue: 14997, Customer: 'UrbanNest Studio', Region: 'West', Source: 'Stripe' },
        { Date: '2024-03-18', ChargeID: 'ch_107', Plan: 'SaaS Enterprise Annual', Category: 'Annual Licenses', Amount: 298000, Revenue: 298000, Customer: 'DataPrime Systems', Region: 'South', Source: 'Stripe' },
        { Date: '2024-04-05', ChargeID: 'ch_108', Plan: 'SaaS Pro Monthly', Category: 'Subscriptions', Amount: 19996, Revenue: 19996, Customer: 'UrbanNest Studio', Region: 'West', Source: 'Stripe' },
        { Date: '2024-04-22', ChargeID: 'ch_109', Plan: 'SaaS Enterprise Annual', Category: 'Annual Licenses', Amount: 149000, Revenue: 149000, Customer: 'FinEdge Finance', Region: 'North', Source: 'Stripe' },
        { Date: '2024-05-05', ChargeID: 'ch_110', Plan: 'SaaS Pro Monthly', Category: 'Subscriptions', Amount: 24995, Revenue: 24995, Customer: 'UrbanNest Studio', Region: 'West', Source: 'Stripe' },
        { Date: '2024-05-19', ChargeID: 'ch_111', Plan: 'SaaS Enterprise Annual', Category: 'Annual Licenses', Amount: 447000, Revenue: 447000, Customer: 'Nexus Auto Holdings', Region: 'West', Source: 'Stripe' },
        { Date: '2024-06-05', ChargeID: 'ch_112', Plan: 'SaaS Pro Monthly', Category: 'Subscriptions', Amount: 29994, Revenue: 29994, Customer: 'UrbanNest Studio', Region: 'West', Source: 'Stripe' },
        { Date: '2024-06-20', ChargeID: 'ch_113', Plan: 'SaaS Enterprise Annual', Category: 'Annual Licenses', Amount: 298000, Revenue: 298000, Customer: 'AeroDynamics Tech', Region: 'North', Source: 'Stripe' },
      ];

    default:
      // Default retail business sync
      return [
        { Date: '2024-01-08', OrderID: 'REC-01', Product: 'Executive Desk Chair', Category: 'Office Furniture', Quantity: 2, Price: 18500, Revenue: 37000, Customer: 'Ramesh Gupta', Region: 'North', Source: providerId },
        { Date: '2024-01-18', OrderID: 'REC-02', Product: 'Electric Standing Desk', Category: 'Office Furniture', Quantity: 1, Price: 34999, Revenue: 34999, Customer: 'Alka Verma', Region: 'West', Source: providerId },
        { Date: '2024-02-04', OrderID: 'REC-03', Product: 'Executive Desk Chair', Category: 'Office Furniture', Quantity: 3, Price: 18500, Revenue: 55500, Customer: 'Praveen Rao', Region: 'South', Source: providerId },
        { Date: '2024-02-19', OrderID: 'REC-04', Product: 'Monitor Arm Dual Mount', Category: 'Accessories', Quantity: 4, Price: 4200, Revenue: 16800, Customer: 'Sunita Mehra', Region: 'North', Source: providerId },
        { Date: '2024-03-08', OrderID: 'REC-05', Product: 'Electric Standing Desk', Category: 'Office Furniture', Quantity: 2, Price: 34999, Revenue: 69998, Customer: 'Vikrant Bedi', Region: 'East', Source: providerId },
        { Date: '2024-03-24', OrderID: 'REC-06', Product: 'Acoustic Privacy Panel', Category: 'Accessories', Quantity: 6, Price: 3100, Revenue: 18600, Customer: 'Neha Kapoor', Region: 'West', Source: providerId },
        { Date: '2024-04-10', OrderID: 'REC-07', Product: 'Executive Desk Chair', Category: 'Office Furniture', Quantity: 4, Price: 18500, Revenue: 74000, Customer: 'Manish Pandey', Region: 'South', Source: providerId },
        { Date: '2024-04-26', OrderID: 'REC-08', Product: 'Electric Standing Desk', Category: 'Office Furniture', Quantity: 3, Price: 34999, Revenue: 104997, Customer: 'Divya Nair', Region: 'North', Source: providerId },
        { Date: '2024-05-12', OrderID: 'REC-09', Product: 'Executive Desk Chair', Category: 'Office Furniture', Quantity: 5, Price: 18500, Revenue: 92500, Customer: 'Karan Johar', Region: 'West', Source: providerId },
        { Date: '2024-05-28', OrderID: 'REC-10', Product: 'Electric Standing Desk', Category: 'Office Furniture', Quantity: 4, Price: 34999, Revenue: 139996, Customer: 'Anand Shrestha', Region: 'East', Source: providerId },
        { Date: '2024-06-14', OrderID: 'REC-11', Product: 'Executive Desk Chair', Category: 'Office Furniture', Quantity: 6, Price: 18500, Revenue: 111000, Customer: 'Shubman Gill', Region: 'North', Source: providerId },
        { Date: '2024-06-28', OrderID: 'REC-12', Product: 'Electric Standing Desk', Category: 'Office Furniture', Quantity: 5, Price: 34999, Revenue: 174995, Customer: 'Suresh Raina', Region: 'South', Source: providerId },
      ];
  }
}
