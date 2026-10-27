import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  Download,
  Plus,
  RotateCcw,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ArrowRight,
  User,
} from 'lucide-react';
import {
  CustomerQuery,
  getStoredQueries,
  saveQuery,
  updateQuery,
  deleteQuery,
  resetToSampleQueries,
  exportQueriesToCsv,
} from '../utils/leadsStorage';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REQUIRED_PASSCODE = '1214';

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  // Authentication state stored in sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sirenexis_admin_authenticated') === 'true';
  });

  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [shakeError, setShakeError] = useState(false);

  // Queries and filtering state
  const [queries, setQueries] = useState<CustomerQuery[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualFormError, setManualFormError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Quick form for manual query logging
  const [newManualQuery, setNewManualQuery] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phone: '',
    weeklyEnquiries: '20-50 enquiries/day',
    channels: ['Email Support', 'Live Chat'],
    preferredTime: '10:30 AM UK (GMT+1)',
    notes: '',
    source: 'Direct Enquiry' as const,
  });

  // Load queries
  const loadQueries = () => {
    setQueries(getStoredQueries());
  };

  useEffect(() => {
    if (isOpen) {
      loadQueries();
    }
  }, [isOpen]);

  // Listen for storage events or window events
  useEffect(() => {
    const handleSync = () => {
      loadQueries();
    };
    window.addEventListener('sirenexis_query_saved', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('sirenexis_query_saved', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showAddModal) {
          setShowAddModal(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showAddModal, onClose]);

  if (!isOpen) return null;

  // Handle Passcode Submission
  const handlePasscodeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim() === REQUIRED_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sirenexis_admin_authenticated', 'true');
      setPasscodeError(null);
      setPasscode('');
      loadQueries();
    } else {
      setShakeError(true);
      setPasscodeError('Invalid passcode. Please enter the authorized 4-digit PIN.');
      setTimeout(() => setShakeError(false), 500);
    }
  };

  const handleKeypadPress = (val: string) => {
    if (passcode.length < 6) {
      const next = passcode + val;
      setPasscode(next);
      setPasscodeError(null);
      if (next === REQUIRED_PASSCODE) {
        setIsAuthenticated(true);
        sessionStorage.setItem('sirenexis_admin_authenticated', 'true');
        setPasscode('');
        loadQueries();
      }
    }
  };

  const handleBackspace = () => {
    setPasscode((prev) => prev.slice(0, -1));
    setPasscodeError(null);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sirenexis_admin_authenticated');
    setPasscode('');
  };

  // Status updates
  const handleStatusChange = (id: string, status: CustomerQuery['status']) => {
    const updated = updateQuery(id, { status });
    setQueries(updated);
  };

  // Save internal notes
  const handleSaveNotes = (id: string) => {
    const updated = updateQuery(id, { internalNotes: tempNotes });
    setQueries(updated);
    setEditingNotesId(null);
  };

  // Delete query (two-click inline confirm, iframe-safe)
  const handleDeleteQuery = (id: string) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    const updated = deleteQuery(id);
    setQueries(updated);
    setConfirmDeleteId(null);
    if (selectedLeadId === id) setSelectedLeadId(null);
  };

  // Add manual query
  const handleAddManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManualQuery.fullName.trim() || !newManualQuery.businessEmail.trim() || !newManualQuery.companyName.trim()) {
      setManualFormError('Please fill out Full Name, Email, and Company Name.');
      return;
    }
    setManualFormError(null);
    saveQuery({
      ...newManualQuery,
      source: 'Direct Enquiry',
      status: 'New',
    });
    setShowAddModal(false);
    setNewManualQuery({
      fullName: '',
      businessEmail: '',
      companyName: '',
      phone: '',
      weeklyEnquiries: '20-50 enquiries/day',
      channels: ['Email Support', 'Live Chat'],
      preferredTime: '10:30 AM UK',
      notes: '',
      source: 'Direct Enquiry',
    });
    loadQueries();
  };

  // Reset to samples (two-click inline confirm, iframe-safe)
  const handleResetToSamples = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3500);
      return;
    }
    const samples = resetToSampleQueries();
    setQueries(samples);
    setConfirmReset(false);
  };

  // Filter queries
  const filteredQueries = queries.filter((q) => {
    const matchesSearch =
      q.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.businessEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.notes && q.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || q.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const countNew = queries.filter((q) => q.status === 'New').length;
  const countInReview = queries.filter((q) => q.status === 'In Review').length;
  const countContacted = queries.filter((q) => q.status === 'Contacted').length;
  const countBooked = queries.filter((q) => q.status === 'Booked').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#051F20]/80 backdrop-blur-md transition-opacity duration-300">
      
      {/* Container */}
      <div className="relative w-full max-w-5xl bg-[#FAF8F2] border border-[#8EB69B]/50 rounded-[28px] shadow-[0_25px_60px_rgba(5,31,32,0.4)] overflow-hidden max-h-[92vh] flex flex-col apple-sheet-animate">
        
        {/* ===================== VIEW 1: PASSCODE LOCK SCREEN ===================== */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            
            {/* Top Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-[#051F20]/70 hover:text-[#051F20] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lock Icon Emblem */}
            <div className="w-16 h-16 rounded-2xl bg-[#051F20] text-[#FAF8F2] flex items-center justify-center mb-5 shadow-lg shadow-[#051F20]/20 border border-[#8EB69B]/30">
              <Lock className="w-8 h-8 text-[#8EB69B]" />
            </div>

            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#235347] bg-[#DAF1DE] px-3 py-1 rounded-full border border-[#8EB69B]/40">
              <ShieldCheck className="w-3.5 h-3.5 text-[#235347]" />
              <span>Sirenexis Internal Operations</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#051F20] mt-2 mb-2">
              Admin Portal
            </h3>

            <p className="text-sm text-[#163832]/80 max-w-md mb-8">
              Access incoming consultation bookings, customer enquiries, and lead management.
            </p>

            {/* Passcode Box Form */}
            <form onSubmit={handlePasscodeSubmit} className="w-full max-w-xs space-y-5">
              
              <div className={`transition-transform ${shakeError ? 'animate-bounce' : ''}`}>
                <div className="flex justify-center items-center gap-3 mb-2">
                  {[0, 1, 2, 3].map((idx) => {
                    const char = passcode[idx];
                    return (
                      <div
                        key={idx}
                        className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center font-mono text-2xl font-bold transition-all ${
                          char
                            ? 'border-[#235347] bg-[#DAF1DE]/40 text-[#051F20] shadow-sm'
                            : 'border-[#163832]/25 bg-white text-[#163832]/30'
                        }`}
                      >
                        {char ? '•' : ''}
                      </div>
                    );
                  })}
                </div>

                <input
                  type="password"
                  maxLength={6}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError(null);
                  }}
                  autoFocus
                  placeholder="Type passcode..."
                  className="w-full text-center px-4 py-2 bg-white rounded-xl border border-[#163832]/20 text-[#051F20] font-mono text-sm tracking-widest focus:outline-none focus:border-[#235347]"
                />
              </div>

              {passcodeError && (
                <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-rose-600 bg-rose-50 py-2 px-3 rounded-lg border border-rose-200">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passcodeError}</span>
                </div>
              )}

              {/* Onscreen Keypad */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleKeypadPress(digit)}
                    className="h-12 rounded-xl bg-white border border-[#163832]/15 hover:bg-[#DAF1DE]/50 hover:border-[#8EB69B] active:scale-95 font-medium text-lg text-[#051F20] transition-all cursor-pointer shadow-sm"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPasscode('')}
                  className="h-12 rounded-xl bg-white border border-[#163832]/15 hover:bg-rose-50 text-xs font-semibold text-[#163832] transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress('0')}
                  className="h-12 rounded-xl bg-white border border-[#163832]/15 hover:bg-[#DAF1DE]/50 hover:border-[#8EB69B] font-medium text-lg text-[#051F20] transition-colors cursor-pointer shadow-sm"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleBackspace}
                  className="h-12 rounded-xl bg-white border border-[#163832]/15 hover:bg-slate-100 text-xs font-semibold text-[#163832] transition-colors cursor-pointer"
                >
                  ⌫
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] font-medium text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-[#8EB69B]" />
                <span>Unlock Portal</span>
              </button>
            </form>

          </div>
        ) : (
          
          /* ===================== VIEW 2: AUTHENTICATED ADMIN DASHBOARD ===================== */
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Top Bar Header */}
            <div className="p-4 sm:p-6 border-b border-[#163832]/10 bg-[#F4F0E6]/80 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#051F20] text-[#8EB69B] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#051F20]">
                      Sirenexis Admin Portal
                    </h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#235347] bg-[#DAF1DE] px-2 py-0.5 rounded-full border border-[#8EB69B]/40">
                      Live Enquiries
                    </span>
                  </div>
                  <p className="text-xs text-[#163832]/70">
                    UK Operations Desk • English Law Client Inbound
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSignOut}
                  title="Lock admin session"
                  className="py-1.5 px-3 rounded-lg border border-[#163832]/20 text-xs font-semibold text-[#163832] hover:bg-black/5 flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Session</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-[#051F20] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick KPI Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-white border-b border-[#163832]/10 shrink-0">
              
              <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#163832]/10">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#163832]/70">
                  Total Queries
                </div>
                <div className="text-2xl font-serif font-bold text-[#051F20] mt-0.5">
                  {queries.length}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#DAF1DE]/40 border border-[#8EB69B]/50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#235347] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>New Enquiries</span>
                </div>
                <div className="text-2xl font-serif font-bold text-[#0B2B26] mt-0.5">
                  {countNew}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#163832]/10">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#163832]/70">
                  In Review / Contacted
                </div>
                <div className="text-2xl font-serif font-bold text-[#051F20] mt-0.5">
                  {countInReview + countContacted}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#163832]/10">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#163832]/70">
                  Pilots / Booked
                </div>
                <div className="text-2xl font-serif font-bold text-[#235347] mt-0.5">
                  {countBooked}
                </div>
              </div>

            </div>

            {/* Search, Filter & Action Toolbar */}
            <div className="p-4 border-b border-[#163832]/10 bg-[#FAF8F2] flex flex-wrap items-center justify-between gap-3 shrink-0">
              
              <div className="flex flex-wrap items-center gap-2 flex-grow max-w-xl">
                {/* Search Box */}
                <div className="relative flex-grow min-w-[200px]">
                  <Search className="w-4 h-4 text-[#163832]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, company, email, phone..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#163832]/20 text-[#051F20] placeholder-[#163832]/40 focus:outline-none focus:border-[#235347]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#163832]/60 hover:text-[#051F20]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Tabs */}
                <div className="flex items-center gap-1 bg-[#F4F0E6] p-1 rounded-xl border border-[#163832]/10 text-xs">
                  {['all', 'New', 'In Review', 'Contacted', 'Booked', 'Closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm font-semibold'
                          : 'text-[#163832]/80 hover:text-[#051F20]'
                      }`}
                    >
                      {st === 'all' ? 'All' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="py-1.5 px-3 rounded-xl bg-[#235347] hover:bg-[#163832] text-[#FAF8F2] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Lead</span>
                </button>

                <button
                  type="button"
                  onClick={() => exportQueriesToCsv(filteredQueries)}
                  title="Export to CSV"
                  className="py-1.5 px-3 rounded-xl bg-white border border-[#163832]/20 hover:bg-[#DAF1DE]/40 text-[#051F20] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#235347]" />
                  <span>CSV</span>
                </button>

                <a
                  href="/project.zip"
                  download="sirenexis-project.zip"
                  title="Download complete updated codebase for GitHub/Vercel"
                  className="py-1.5 px-3 rounded-xl bg-[#051F20] hover:bg-[#163832] text-[#FAF8F2] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-[#8EB69B]" />
                  <span>Download Code (ZIP)</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetToSamples}
                  title="Reset sample leads"
                  className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                    confirmReset
                      ? 'bg-amber-100 border-amber-400 text-amber-900 font-semibold px-2.5'
                      : 'bg-white border-[#163832]/20 hover:bg-black/5 text-[#163832]/70 hover:text-[#051F20]'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {confirmReset && <span>Confirm Reset?</span>}
                </button>
              </div>

            </div>

            {/* Queries List Area (Scrollable) */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-3">
              {filteredQueries.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#163832]/20 p-8">
                  <div className="w-12 h-12 rounded-full bg-[#DAF1DE] text-[#235347] flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-medium text-[#051F20]">No queries found</h4>
                  <p className="text-xs text-[#163832]/70 max-w-sm mx-auto mt-1 mb-4">
                    {searchQuery || statusFilter !== 'all'
                      ? 'Try adjusting your search terms or status filter tab.'
                      : 'No enquiries currently logged. When a visitor submits a 15-minute call or discovery request, it will appear here in real time.'}
                  </p>
                  <button
                    onClick={handleResetToSamples}
                    className="px-4 py-2 rounded-xl bg-[#051F20] text-[#FAF8F2] text-xs font-semibold hover:bg-[#163832] transition-colors"
                  >
                    Load Sample UK Client Enquiries
                  </button>
                </div>
              ) : (
                filteredQueries.map((query) => {
                  const isExpanded = selectedLeadId === query.id;
                  const isEditingNotes = editingNotesId === query.id;

                  // Status styling
                  const statusColors: Record<CustomerQuery['status'], { badge: string; dot: string }> = {
                    New: { badge: 'bg-[#DAF1DE] text-[#051F20] border-[#8EB69B]', dot: 'bg-emerald-600 animate-pulse' },
                    'In Review': { badge: 'bg-amber-100 text-amber-900 border-amber-300', dot: 'bg-amber-600' },
                    Contacted: { badge: 'bg-sky-100 text-sky-900 border-sky-300', dot: 'bg-sky-600' },
                    Booked: { badge: 'bg-emerald-100 text-emerald-900 border-emerald-300', dot: 'bg-emerald-600' },
                    Closed: { badge: 'bg-slate-100 text-slate-700 border-slate-300', dot: 'bg-slate-500' },
                  };

                  const currentStyle = statusColors[query.status] || statusColors.New;
                  const formattedDate = new Date(query.createdAt).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={query.id}
                      className={`bg-white rounded-2xl border transition-all shadow-sm ${
                        isExpanded
                          ? 'border-[#235347] ring-1 ring-[#235347]/30 shadow-md'
                          : 'border-[#163832]/12 hover:border-[#163832]/30'
                      }`}
                    >
                      {/* Query Card Header / Row */}
                      <div className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          
                          {/* Prospect Info */}
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FAF8F2] border border-[#163832]/15 flex items-center justify-center font-bold text-sm text-[#0B2B26] shrink-0 mt-0.5">
                              {query.fullName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-sm sm:text-base text-[#051F20]">
                                  {query.fullName}
                                </h4>
                                <span className="text-xs text-[#163832]/80 font-medium flex items-center gap-1">
                                  <Building className="w-3.5 h-3.5 text-[#235347]" />
                                  <span>{query.companyName}</span>
                                </span>
                              </div>

                              <div className="flex items-center gap-3 mt-1 text-xs text-[#163832]/75 flex-wrap">
                                <a
                                  href={`mailto:${query.businessEmail}`}
                                  className="flex items-center gap-1 hover:text-[#051F20] hover:underline"
                                >
                                  <Mail className="w-3.5 h-3.5 text-[#235347]" />
                                  <span>{query.businessEmail}</span>
                                </a>
                                <a
                                  href={`tel:${query.phone}`}
                                  className="flex items-center gap-1 hover:text-[#051F20] hover:underline"
                                >
                                  <Phone className="w-3.5 h-3.5 text-[#235347]" />
                                  <span>{query.phone}</span>
                                </a>
                                <span className="flex items-center gap-1 text-[#163832]/60">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{formattedDate} UK</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Status and Action Buttons */}
                          <div className="flex items-center gap-2 self-start sm:self-center">
                            
                            {/* Status Selector */}
                            <select
                              value={query.status}
                              onChange={(e) =>
                                handleStatusChange(query.id, e.target.value as CustomerQuery['status'])
                              }
                              className={`text-xs font-semibold py-1.5 px-3 rounded-full border cursor-pointer focus:outline-none transition-colors ${currentStyle.badge}`}
                            >
                              <option value="New">● New</option>
                              <option value="In Review">● In Review</option>
                              <option value="Contacted">● Contacted</option>
                              <option value="Booked">● Booked (Pilot/Call)</option>
                              <option value="Closed">● Closed</option>
                            </select>

                            {/* Expand / Details Toggle */}
                            <button
                              type="button"
                              onClick={() => setSelectedLeadId(isExpanded ? null : query.id)}
                              className="p-1.5 rounded-lg border border-[#163832]/15 text-xs text-[#163832] hover:bg-[#FAF8F2] cursor-pointer flex items-center gap-1"
                            >
                              <span>{isExpanded ? 'Less' : 'Details'}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteQuery(query.id)}
                              title="Delete enquiry"
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs ${
                                confirmDeleteId === query.id
                                  ? 'bg-rose-600 text-white px-2.5 font-semibold'
                                  : 'text-rose-500 hover:text-rose-700 hover:bg-rose-50'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              {confirmDeleteId === query.id && <span>Confirm</span>}
                            </button>
                          </div>

                        </div>

                        {/* Channel Badges + Brief Slot Preview */}
                        <div className="mt-3 pt-3 border-t border-[#163832]/8 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[#163832]/60 font-medium">Channels:</span>
                            {query.channels && query.channels.length > 0 ? (
                              query.channels.map((ch) => (
                                <span
                                  key={ch}
                                  className="px-2 py-0.5 rounded-md bg-[#FAF8F2] border border-[#163832]/15 text-[11px] text-[#163832] font-medium"
                                >
                                  {ch}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">None specified</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-[#235347] font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Slot: {query.preferredTime || 'Next available slot'}</span>
                          </div>
                        </div>

                        {/* Collapsible Detailed Lead Card */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-[#163832]/10 space-y-4 animate-in fade-in duration-150">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF8F2] p-4 rounded-xl border border-[#163832]/10 text-xs">
                              <div>
                                <span className="font-semibold text-[#051F20] block mb-1">
                                  Enquiry Source & Volume:
                                </span>
                                <p className="text-[#163832]/80">
                                  <strong>Source:</strong> {query.source}
                                  <br />
                                  <strong>Volume:</strong> {query.weeklyEnquiries || 'Not specified'}
                                </p>
                              </div>

                              <div>
                                <span className="font-semibold text-[#051F20] block mb-1">
                                  Preferred Consultation:
                                </span>
                                <p className="text-[#163832]/80">
                                  <strong>Date:</strong> {query.preferredDate || 'Earliest available'}
                                  <br />
                                  <strong>Slot:</strong> {query.preferredTime}
                                </p>
                              </div>
                            </div>

                            {/* Client notes / plan interest */}
                            {query.notes && (
                              <div className="p-3 bg-white rounded-xl border border-[#163832]/15 text-xs">
                                <span className="font-semibold text-[#051F20] block mb-1">
                                  Client Note / Requirement:
                                </span>
                                <p className="text-[#163832]/90 italic">"{query.notes}"</p>
                              </div>
                            )}

                            {/* Internal Staff Notes */}
                            <div className="p-3 bg-[#DAF1DE]/30 rounded-xl border border-[#8EB69B]/40 text-xs">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="font-semibold text-[#235347] flex items-center gap-1.5">
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Internal Staff Notes:</span>
                                </span>
                                {!isEditingNotes && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingNotesId(query.id);
                                      setTempNotes(query.internalNotes || '');
                                    }}
                                    className="text-[11px] font-semibold text-[#051F20] hover:underline cursor-pointer"
                                  >
                                    {query.internalNotes ? 'Edit' : '+ Add Note'}
                                  </button>
                                )}
                              </div>

                              {isEditingNotes ? (
                                <div className="space-y-2">
                                  <textarea
                                    value={tempNotes}
                                    onChange={(e) => setTempNotes(e.target.value)}
                                    placeholder="e.g. Spoke with Rachel. High intent. Sent Pilot agreement to legal."
                                    className="w-full p-2.5 bg-white border border-[#8EB69B] rounded-lg text-xs text-[#051F20] focus:outline-none"
                                    rows={3}
                                  />
                                  <div className="flex justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setEditingNotesId(null)}
                                      className="px-2.5 py-1 rounded-md text-xs text-[#163832]/70 hover:bg-black/5"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleSaveNotes(query.id)}
                                      className="px-3 py-1 rounded-md bg-[#235347] text-white text-xs font-semibold hover:bg-[#163832]"
                                    >
                                      Save Note
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-[#163832]/90">
                                  {query.internalNotes || (
                                    <span className="text-gray-400 italic">
                                      No internal notes logged yet.
                                    </span>
                                  )}
                                </p>
                              )}
                            </div>

                            {/* Direct Actions */}
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <a
                                href={`mailto:${query.businessEmail}?subject=Sirenexis%20Briefing%20Follow-up%20for%20${encodeURIComponent(
                                  query.companyName
                                )}`}
                                className="py-1.5 px-3 rounded-lg bg-[#051F20] text-[#FAF8F2] text-xs font-medium hover:bg-[#163832] flex items-center gap-1.5"
                              >
                                <Mail className="w-3.5 h-3.5 text-[#8EB69B]" />
                                <span>Send Email to {query.fullName.split(' ')[0]}</span>
                              </a>
                              <a
                                href={`tel:${query.phone}`}
                                className="py-1.5 px-3 rounded-lg bg-white border border-[#163832]/20 text-[#051F20] text-xs font-medium hover:bg-[#DAF1DE]/40 flex items-center gap-1.5"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#235347]" />
                                <span>Call {query.phone}</span>
                              </a>
                            </div>

                          </div>
                        )}

                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Information */}
            <div className="p-4 border-t border-[#163832]/10 bg-[#F4F0E6]/60 flex items-center justify-between text-xs text-[#163832]/70 shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#235347]" />
                <span>Authorized Sirenexis Team & Client Operations</span>
              </div>
              <span className="text-[11px] text-[#163832]/60">
                Confidential • Internal Use Only
              </span>
            </div>

          </div>
        )}

      </div>

      {/* Manual Lead Logging Sub-Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F2] border border-[#8EB69B] rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#163832]/10">
              <h4 className="font-serif text-xl font-bold text-[#051F20]">Log New Inbound Lead</h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#163832] hover:bg-black/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualSubmit} className="space-y-3 text-xs">
              <div className="relative">
                <input
                  id="admin-fullName"
                  type="text"
                  required
                  value={newManualQuery.fullName}
                  onChange={(e) =>
                    setNewManualQuery({ ...newManualQuery, fullName: e.target.value })
                  }
                  placeholder=" "
                  className="peer w-full px-3 pt-4 pb-1.5 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] text-xs focus:outline-none focus:border-[#235347] focus:ring-1 focus:ring-[#235347]/20 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="admin-fullName"
                  className={`pointer-events-none absolute left-3 transition-all duration-200 ease-out origin-left ${
                    newManualQuery.fullName
                      ? 'top-1 text-[10px] font-semibold text-[#235347]'
                      : 'top-2.5 text-xs text-[#163832]/50 peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-[#235347]'
                  }`}
                >
                  Full Name *
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    id="admin-companyName"
                    type="text"
                    required
                    value={newManualQuery.companyName}
                    onChange={(e) =>
                      setNewManualQuery({ ...newManualQuery, companyName: e.target.value })
                    }
                    placeholder=" "
                    className="peer w-full px-3 pt-4 pb-1.5 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] text-xs focus:outline-none focus:border-[#235347] focus:ring-1 focus:ring-[#235347]/20 transition-all placeholder-transparent"
                  />
                  <label
                    htmlFor="admin-companyName"
                    className={`pointer-events-none absolute left-3 transition-all duration-200 ease-out origin-left ${
                      newManualQuery.companyName
                        ? 'top-1 text-[10px] font-semibold text-[#235347]'
                        : 'top-2.5 text-xs text-[#163832]/50 peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-[#235347]'
                    }`}
                  >
                    Company Name *
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="admin-businessEmail"
                    type="email"
                    required
                    value={newManualQuery.businessEmail}
                    onChange={(e) =>
                      setNewManualQuery({ ...newManualQuery, businessEmail: e.target.value })
                    }
                    placeholder=" "
                    className="peer w-full px-3 pt-4 pb-1.5 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] text-xs focus:outline-none focus:border-[#235347] focus:ring-1 focus:ring-[#235347]/20 transition-all placeholder-transparent"
                  />
                  <label
                    htmlFor="admin-businessEmail"
                    className={`pointer-events-none absolute left-3 transition-all duration-200 ease-out origin-left ${
                      newManualQuery.businessEmail
                        ? 'top-1 text-[10px] font-semibold text-[#235347]'
                        : 'top-2.5 text-xs text-[#163832]/50 peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-[#235347]'
                    }`}
                  >
                    Business Email *
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  id="admin-phone"
                  type="tel"
                  value={newManualQuery.phone}
                  onChange={(e) =>
                    setNewManualQuery({ ...newManualQuery, phone: e.target.value })
                  }
                  placeholder=" "
                  className="peer w-full px-3 pt-4 pb-1.5 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] text-xs focus:outline-none focus:border-[#235347] focus:ring-1 focus:ring-[#235347]/20 transition-all placeholder-transparent"
                />
                <label
                  htmlFor="admin-phone"
                  className={`pointer-events-none absolute left-3 transition-all duration-200 ease-out origin-left ${
                    newManualQuery.phone
                      ? 'top-1 text-[10px] font-semibold text-[#235347]'
                      : 'top-2.5 text-xs text-[#163832]/50 peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-[#235347]'
                  }`}
                >
                  UK Phone Number
                </label>
              </div>

              <div>
                <label className="block font-semibold text-[#051F20] mb-1">Enquiry / Notes</label>
                <textarea
                  rows={2}
                  value={newManualQuery.notes}
                  onChange={(e) =>
                    setNewManualQuery({ ...newManualQuery, notes: e.target.value })
                  }
                  placeholder="Details of enquiry, plan interest, call notes..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] focus:outline-none focus:border-[#235347]"
                />
              </div>

              {manualFormError && (
                <p className="text-xs text-rose-600 font-medium">{manualFormError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setManualFormError(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#163832] hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#051F20] text-[#FAF8F2] text-xs font-semibold hover:bg-[#163832]"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
