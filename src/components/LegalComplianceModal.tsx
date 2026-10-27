import React, { useEffect } from 'react';
import { X, ShieldCheck, Lock, FileText, Scale, CheckCircle2, ArrowRight } from 'lucide-react';

export type LegalTabId = 'privacy' | 'terms' | 'gdpr' | 'security';

interface LegalComplianceModalProps {
  isOpen: boolean;
  initialTab: LegalTabId;
  onClose: () => void;
  onBookCall: () => void;
}

const TABS: { id: LegalTabId; label: string; shortLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'privacy', label: 'Privacy Policy', shortLabel: 'Privacy', icon: FileText },
  { id: 'terms', label: 'Terms & Master Services Agreement', shortLabel: 'Terms & MSA', icon: Scale },
  { id: 'gdpr', label: 'UK GDPR & ICO Compliance', shortLabel: 'UK GDPR', icon: ShieldCheck },
  { id: 'security', label: 'Data Security & NDA Protocol', shortLabel: 'Security & NDA', icon: Lock },
];

export const LegalComplianceModal: React.FC<LegalComplianceModalProps> = ({
  isOpen,
  initialTab,
  onClose,
  onBookCall,
}) => {
  const [activeTab, setActiveTab] = React.useState<LegalTabId>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#051F20]/75 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F2] border border-[#8EB69B]/50 rounded-[24px] sm:rounded-[32px] shadow-[0_32px_80px_rgba(5,31,32,0.35)] overflow-hidden max-h-[90dvh] flex flex-col apple-sheet-animate"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-3.5 sm:pb-4 border-b border-[#163832]/10 bg-[#F4F0E6]/80 flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#235347] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#235347] shrink-0" />
              <span className="truncate">Sirenexis UK Governance & Compliance</span>
            </div>
            <h3 className="font-serif text-xl sm:text-3xl font-normal text-[#051F20] leading-snug">
              Legal, Data Security & UK GDPR Framework
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#163832] hover:text-[#051F20] hover:bg-black/5 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Tab Selector */}
        <div className="px-4 sm:px-8 py-3 bg-[#F4F0E6]/40 border-b border-[#163832]/10 shrink-0">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-1.5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-3.5 py-2.5 sm:py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                      : 'bg-white/70 sm:bg-transparent border border-[#163832]/10 sm:border-transparent text-[#163832]/85 hover:text-[#051F20] hover:bg-[#163832]/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden truncate">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-4 sm:p-8 flex-1 min-h-0 overflow-y-auto space-y-5 sm:space-y-6 text-sm leading-relaxed text-[#163832]/90">
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#163832]/10">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#051F20] font-normal">
                    Privacy Policy
                  </h4>
                  <p className="text-xs text-[#235347] mt-0.5">
                    Effective Date: January 2026 · Governed by the UK Data Protection Act 2018
                  </p>
                </div>
                <span className="text-xs font-medium text-[#235347]">
                  Controller: Sirenexis (UK)
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">1. Data We Collect & Lawful Basis</h5>
                  <p>
                    When you book a consultation, request a pilot, or use our ROI calculator, we collect only the business contact details necessary to prepare your staffing proposal (name, business email, UK phone number, company name, and support ticket volume). Processing is conducted under <strong>Legitimate Business Interest</strong> and <strong>Contractual Necessity</strong> under UK GDPR Article 6(1)(b) and (f).
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">2. Client Customer Data (Processor Obligations)</h5>
                  <p>
                    During active client engagements, your company remains the <strong>Data Controller</strong> of your customers&apos; personal data, and Sirenexis acts strictly as a bound <strong>Data Processor</strong>. Agents access your helpdesk (e.g., Gorgias, Zendesk, HubSpot, Freshdesk) via role-restricted credentials and never download or store customer records on local devices.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">3. Data Retention & Subject Access Rights</h5>
                  <p>
                    Consultation records are retained only for the duration of our commercial relationship. Under the UK GDPR, you have the right to request access, rectification, erasure, or portability of your data at any time by contacting our Data Protection Officer at <a href="mailto:info@sirenexis.com" className="text-[#051F20] font-semibold underline">info@sirenexis.com</a>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#163832]/10">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#051F20] font-normal">
                    Terms of Service & Master Services Agreement (MSA)
                  </h4>
                  <p className="text-xs text-[#235347] mt-0.5">
                    Jurisdiction: Courts of England and Wales · Commercial B2B Framework
                  </p>
                </div>
                <span className="text-xs font-medium text-[#235347]">
                  English Law Contract
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">1. UK Contracting Entity & Invoicing</h5>
                  <p>
                    All client agreements are executed directly with Sirenexis under the laws of England and Wales. Invoices are issued monthly in GBP (£) payable via UK bank transfer (Faster Payments / BACS), providing full domestic accounting clarity and zero offshore wire complexity.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">2. 2-Week Paid Pilot & 100% Money-Back Guarantee</h5>
                  <p>
                    Our 2-Week Paid Pilot (£750) includes SOP intake, read-only shadowing, and supervised live ticket resolution. If you decide within the 14-day pilot window that the service is not the right fit for your business, we refund 100% of your £750 pilot fee—no penalty clauses.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">3. Service Level Agreement (SLA) & Cover Continuity</h5>
                  <p>
                    Every Part-Time (20 hrs/wk) and Full-Time (40 hrs/wk) plan includes a trained backup cover agent at no additional cost. If your primary agent takes annual leave or falls ill, your secondary SOP-trained agent steps in immediately so your inbox and phone lines remain covered during UK trading hours.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">4. Flexible Rolling Notice</h5>
                  <p>
                    Following the initial onboarding term, agreements operate on a simple 30-day rolling basis. You may scale up, switch between Part-Time and Full-Time coverage, or conclude the agreement with 30 days&apos; written notice.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gdpr' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#163832]/10">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#051F20] font-normal">
                    UK GDPR & ICO IDTA Compliance
                  </h4>
                  <p className="text-xs text-[#235347] mt-0.5">
                    Information Commissioner&apos;s Office (ICO) International Data Transfer Agreement Standard
                  </p>
                </div>
                <span className="text-xs font-medium text-[#235347]">
                  ICO IDTA Aligned
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F4F0E6] border border-[#163832]/10">
                  <div className="flex items-center gap-2 font-semibold text-[#051F20] mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>ICO International Data Transfer (IDTA)</span>
                  </div>
                  <p className="text-xs text-[#163832]/85 leading-relaxed">
                    Every client engagement includes a pre-executed Data Processing Agreement (DPA) incorporating the UK ICO&apos;s mandatory International Data Transfer Agreement (IDTA) clauses for lawful cross-border remote access.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F0E6] border border-[#163832]/10">
                  <div className="flex items-center gap-2 font-semibold text-[#051F20] mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Zero Local Data Residency</span>
                  </div>
                  <p className="text-xs text-[#163832]/85 leading-relaxed">
                    Customer data never leaves your existing cloud helpdesk or CRM. Agents work strictly within browser-isolated sessions with file downloads, clipboard exports, and local USB storage disabled.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F0E6] border border-[#163832]/10">
                  <div className="flex items-center gap-2 font-semibold text-[#051F20] mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Least-Privilege Access (RBAC)</span>
                  </div>
                  <p className="text-xs text-[#163832]/85 leading-relaxed">
                    Agents are provisioned with scoped support roles (e.g., Support Agent view in Shopify/Gorgias/Xero) without bulk CSV export permissions or administrative billing access.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F0E6] border border-[#163832]/10">
                  <div className="flex items-center gap-2 font-semibold text-[#051F20] mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Instant Revocation Protocol</span>
                  </div>
                  <p className="text-xs text-[#163832]/85 leading-relaxed">
                    Single Sign-On (SSO) and vault-managed sessions can be revoked in under 60 seconds by your UK Account Manager upon role rotation or offboarding.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#163832]/10">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#051F20] font-normal">
                    Data Security, ISO-Aligned Controls & NDA Protocol
                  </h4>
                  <p className="text-xs text-[#235347] mt-0.5">
                    Enterprise Security Architecture for British SMEs
                  </p>
                </div>
                <span className="text-xs font-medium text-[#235347]">
                  100% NDA Protected
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">1. Back-to-Back Non-Disclosure Agreements (NDAs)</h5>
                  <p>
                    Before seeing a single SOP or customer ticket, both Sirenexis (under English law) and your assigned support specialists sign binding Non-Disclosure and Confidentiality Agreements protecting your intellectual property, supplier pricing, and customer lists.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">2. Zero-Knowledge Password & Credential Sharing</h5>
                  <p>
                    You never email plain-text passwords. All system credentials are shared via encrypted enterprise vaults (1Password / LastPass) with masked auto-fill, meaning agents can log into authorized tools without ever viewing or copying raw credentials.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#051F20] mb-1">3. Background Checks & Monitored Workstations</h5>
                  <p>
                    Every Sirenexis specialist undergoes identity verification, criminal background screening, and reference checks prior to onboarding. Workstations are secured with endpoint protection, encrypted disks, and daily UK supervisor QA audits.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-8 py-3.5 sm:py-4 bg-[#F4F0E6]/80 border-t border-[#163832]/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="text-[11px] sm:text-xs text-[#163832]/80 text-center sm:text-left">
            Need a signed mutual NDA or sample MSA? Email <a href="mailto:info@sirenexis.com" className="font-semibold text-[#051F20] underline">info@sirenexis.com</a>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#163832]/20 text-xs font-semibold text-[#163832] hover:bg-black/5 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookCall();
              }}
              className="flex-1 sm:flex-initial justify-center px-4 sm:px-5 py-2.5 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] text-xs font-semibold flex items-center gap-2 shadow-sm cursor-pointer apple-spring-button"
            >
              <span>Request Sample MSA & Call</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8EB69B] shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
