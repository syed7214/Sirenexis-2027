/**
 * Storage and state manager for customer queries / leads in Sirenexis
 */

export interface CustomerQuery {
  id: string;
  createdAt: string; // ISO date string
  fullName: string;
  businessEmail: string;
  companyName: string;
  phone: string;
  weeklyEnquiries?: string;
  channels: string[];
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  source: '15-Min Booking Modal' | 'Discovery Call Form' | 'Direct Enquiry' | 'ROI Consultation';
  status: 'New' | 'In Review' | 'Contacted' | 'Booked' | 'Closed';
  internalNotes?: string;
}

const STORAGE_KEY = 'sirenexis_customer_queries_v1';

export const INITIAL_SAMPLE_QUERIES: CustomerQuery[] = [
  {
    id: 'query-101',
    createdAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(), // 32 mins ago
    fullName: 'Rachel Thorne',
    businessEmail: 'rachel.thorne@kestrelgroup.co.uk',
    companyName: 'Kestrel Logistics Ltd',
    phone: '+44 20 8123 4567',
    weeklyEnquiries: '50-100 enquiries/day',
    channels: ['Email Support', 'Live Chat'],
    preferredDate: '2026-10-22',
    preferredTime: '10:30 AM UK (GMT+1)',
    notes: 'Interested in Full-Time dedicated agent (£2,495/mo). Need weekend coverage for shipping tracking enquiries.',
    source: '15-Min Booking Modal',
    status: 'New',
    internalNotes: 'Checked website: 40-person freight forwarder based in Canary Wharf. High potential.',
  },
  {
    id: 'query-102',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hrs ago
    fullName: 'Oliver Davies',
    businessEmail: 'oliver@bristolcraftroasters.co.uk',
    companyName: 'Bristol Craft Roasters',
    phone: '+44 117 496 0882',
    weeklyEnquiries: '20-50 enquiries/day',
    channels: ['Email Support', 'Live Chat', 'WhatsApp'],
    preferredDate: '2026-10-22',
    preferredTime: '02:00 PM UK',
    notes: 'Interested in 2-Week Paid Pilot. We use Gorgias + Shopify. Current team is overwhelmed during coffee subscription drops.',
    source: 'Discovery Call Form',
    status: 'In Review',
    internalNotes: 'Prepared Gorgias integration SOP checklist.',
  },
  {
    id: 'query-103',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // Yesterday
    fullName: 'Claire Henderson',
    businessEmail: 'c.henderson@apexbiotech.co.uk',
    companyName: 'Apex Medical Technologies',
    phone: '+44 161 718 2931',
    weeklyEnquiries: '10-20 enquiries/day',
    channels: ['Email Support', 'Phone Calls'],
    preferredDate: '2026-10-21',
    preferredTime: '11:30 AM UK',
    notes: 'Part-Time (£1,495/mo) required. Must sign UK GDPR & NHS Supplier compliance data agreement.',
    source: '15-Min Booking Modal',
    status: 'Contacted',
    internalNotes: 'Dispatched standard UK GDPR Data Processing Addendum and MSA. Call scheduled for tomorrow.',
  },
  {
    id: 'query-104',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    fullName: 'Marcus Vance',
    businessEmail: 'marcus@vancearchitecture.co.uk',
    companyName: 'Vance Architecture Studio',
    phone: '+44 20 7946 0819',
    weeklyEnquiries: '15-30 enquiries/day',
    channels: ['Email Support', 'Live Chat'],
    preferredDate: '2026-10-19',
    preferredTime: '03:30 PM UK',
    notes: 'Briefing completed. Starting 2-Week Paid Pilot on 1st November.',
    source: '15-Min Booking Modal',
    status: 'Booked',
    internalNotes: 'Pilot deposit received in UK Barclays account. Setup of dedicated Slack channel underway.',
  },
];

/**
 * Loads queries from localStorage or initializes with realistic default data
 */
export function getStoredQueries(): CustomerQuery[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_QUERIES));
      return INITIAL_SAMPLE_QUERIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_SAMPLE_QUERIES;
  } catch (err) {
    console.error('Failed to read queries from localStorage:', err);
    return INITIAL_SAMPLE_QUERIES;
  }
}

/**
 * Saves a new query submission
 */
export function saveQuery(
  data: Omit<CustomerQuery, 'id' | 'createdAt' | 'status'> & {
    id?: string;
    createdAt?: string;
    status?: CustomerQuery['status'];
  }
): CustomerQuery {
  const existing = getStoredQueries();
  const newQuery: CustomerQuery = {
    id: data.id || `query-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: data.createdAt || new Date().toISOString(),
    fullName: data.fullName,
    businessEmail: data.businessEmail,
    companyName: data.companyName,
    phone: data.phone,
    weeklyEnquiries: data.weeklyEnquiries || '20-50 enquiries/day',
    channels: data.channels || ['Email Support'],
    preferredDate: data.preferredDate || new Date().toISOString().split('T')[0],
    preferredTime: data.preferredTime || '10:30 AM UK (GMT+1)',
    notes: data.notes || '',
    source: data.source || '15-Min Booking Modal',
    status: data.status || 'New',
    internalNotes: data.internalNotes || '',
  };

  const updated = [newQuery, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sirenexis_query_saved', { detail: newQuery }));
  } catch (err) {
    console.error('Failed to save query to localStorage:', err);
  }

  return newQuery;
}

/**
 * Updates an existing query's status or notes
 */
export function updateQuery(id: string, updates: Partial<CustomerQuery>): CustomerQuery[] {
  const existing = getStoredQueries();
  const updated = existing.map((q) => (q.id === id ? { ...q, ...updates } : q));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sirenexis_query_saved', { detail: { id, updates } }));
  } catch (err) {
    console.error('Failed to update query in localStorage:', err);
  }
  return updated;
}

/**
 * Deletes a query
 */
export function deleteQuery(id: string): CustomerQuery[] {
  const existing = getStoredQueries();
  const updated = existing.filter((q) => q.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sirenexis_query_saved', { detail: { deletedId: id } }));
  } catch (err) {
    console.error('Failed to delete query in localStorage:', err);
  }
  return updated;
}

/**
 * Resets storage back to default sample leads
 */
export function resetToSampleQueries(): CustomerQuery[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_QUERIES));
    window.dispatchEvent(new CustomEvent('sirenexis_query_saved'));
  } catch (err) {
    console.error('Failed to reset queries:', err);
  }
  return INITIAL_SAMPLE_QUERIES;
}

/**
 * Exports current queries as a CSV file
 */
export function exportQueriesToCsv(queries: CustomerQuery[]) {
  const headers = [
    'Date Submitted',
    'Status',
    'Full Name',
    'Business Email',
    'Company Name',
    'Phone',
    'Channels',
    'Preferred Time',
    'Source',
    'Notes',
    'Internal Notes',
  ];

  const rows = queries.map((q) => [
    `"${new Date(q.createdAt).toLocaleString('en-GB')}"`,
    `"${q.status}"`,
    `"${q.fullName.replace(/"/g, '""')}"`,
    `"${q.businessEmail.replace(/"/g, '""')}"`,
    `"${q.companyName.replace(/"/g, '""')}"`,
    `"${q.phone.replace(/"/g, '""')}"`,
    `"${(q.channels || []).join(', ')}"`,
    `"${(q.preferredTime || '').replace(/"/g, '""')}"`,
    `"${q.source}"`,
    `"${(q.notes || '').replace(/"/g, '""')}"`,
    `"${(q.internalNotes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `sirenexis-queries-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
