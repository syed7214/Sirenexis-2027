import React from 'react';
import { ShieldCheck, Check, Layers } from 'lucide-react';

export const TrustTicker: React.FC = () => {
  const tools = [
    { name: 'Zendesk', type: 'Helpdesk' },
    { name: 'Gorgias', type: 'E-commerce' },
    { name: 'Intercom', type: 'Conversational' },
    { name: 'WhatsApp Business', type: 'Instant Inbox' },
    { name: 'Slack', type: 'Escalation' },
    { name: 'HubSpot', type: 'CRM & Pipeline' },
    { name: 'Front App', type: 'Shared Inbox' },
    { name: 'Shopify Inbox', type: 'Storefront' },
  ];

  const doubledTools = [...tools, ...tools];

  return (
    <section className="py-8 sm:py-10 bg-[#FAF8F2] border-y border-[#163832]/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-4 sm:mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#235347]">
            <Layers className="w-4 h-4 text-[#235347]" />
            <span>Integrates with your existing UK stack</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-[#163832]/60 font-medium">
            Seamless sync with standard British SME workflows
          </span>
        </div>
      </div>

      {/* Edge Gradient Mask for Silky Vignette Fading */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee-track flex items-center gap-10 py-2">
          {doubledTools.map((tool, idx) => (
            <div
              key={`${tool.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/70 border border-[#163832]/10 shadow-[0_2px_8px_rgba(5,31,32,0.03)] hover:border-[#8EB69B] hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer shrink-0"
            >
              <span className="font-serif text-lg font-semibold tracking-tight text-[#051F20]">
                {tool.name}
              </span>
              <span className="text-[11px] text-[#235347] bg-[#DAF1DE]/60 px-2 py-0.5 rounded-md font-medium border border-[#8EB69B]/30">
                {tool.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
