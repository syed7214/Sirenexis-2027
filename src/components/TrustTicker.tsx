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

  return (
    <section className="py-12 bg-[#FAF8F2] border-y border-[#163832]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Label */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#235347] whitespace-nowrap shrink-0">
            <Layers className="w-4 h-4 text-[#235347]" />
            <span>Integrates with your existing UK stack</span>
          </div>

          {/* Clean tool badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 text-[#163832]/75 hover:text-[#051F20] transition-colors"
              >
                <span className="font-serif text-lg font-semibold tracking-tight text-[#051F20]">
                  {tool.name}
                </span>
                <span className="text-[11px] text-[#235347]/80 font-medium">
                  {tool.type}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
