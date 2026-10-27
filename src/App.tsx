/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustTicker } from './components/TrustTicker';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyUkManaged } from './components/WhyUkManaged';
import { PilotSection } from './components/PilotSection';
import { IdealForBanner } from './components/IdealForBanner';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { SavingsCalculatorModal } from './components/SavingsCalculatorModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { LegalComplianceModal, LegalTabId } from './components/LegalComplianceModal';
import { BackToTopButton } from './components/BackToTopButton';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTabId>('privacy');
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleOpenBooking = (plan?: string) => {
    setSelectedPlan(plan);
    setBookingModalOpen(true);
  };

  const handleOpenLegal = (tab: LegalTabId) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleScrollToPilot = () => {
    const el = document.getElementById('pilot');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-[#FAF8F2] text-[#051F20] font-sans flex flex-col selection:bg-[#DAF1DE] selection:text-[#051F20]">
      {/* 0. Thin Fixed Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* 1. Floating Centered Pill Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-grow w-full overflow-x-hidden">
        {/* 2. Large Editorial Hero with 2-Column Asymmetrical Layout */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenPilot={handleScrollToPilot}
        />

        {/* 3. Logo Ticker / Platform Trust Strip */}
        <TrustTicker />

        {/* 4. Problem / Stats Section with Large Serif Numbers */}
        <ProblemSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenCalculator={() => setCalculatorModalOpen(true)}
        />

        {/* 5. Services Section: 3 Feature Panels with Alternating Image/Glass Cards */}
        <ServicesSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6. Process Section: Horizontal 4-Step Timeline with Thin Green Connectors */}
        <ProcessSection onOpenBooking={() => handleOpenBooking()} />

        {/* 7. Why UK-Managed: Offshore cost. Onshore accountability. */}
        <WhyUkManaged onOpenBooking={() => handleOpenBooking()} />

        {/* 8. The Pilot: 2-Week Paid Pilot. Zero Risk. */}
        <PilotSection onOpenBooking={() => handleOpenBooking('2-Week Paid Pilot')} />

        {/* 9. Ideal For Banner */}
        <IdealForBanner />

        {/* 10. Pricing Section: 3-Tier Cards with Featured Middle Plan Elevated */}
        <PricingSection
          onOpenBooking={(plan) => handleOpenBooking(plan)}
          onOpenCalculator={() => setCalculatorModalOpen(true)}
        />

        {/* 10b. Embedded Interactive UK Hire vs Sirenexis Cost & ROI Comparison */}
        <RoiCalculatorSection onOpenBooking={(plan) => handleOpenBooking(plan)} />

        {/* 11. Testimonials: Editorial Layout (1 Large + 2 Small) with Serif Quotes */}
        <TestimonialsSection />

        {/* 12. FAQ Accordion */}
        <FaqSection />

        {/* 13. Large CTA Section with Alternating Dark Forest Background */}
        <CtaSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* 14. Spacious 4-Column Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenLegal={handleOpenLegal}
      />

      {/* Floating Back to Top Button (appears after scrolling past Hero) */}
      <BackToTopButton />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultPlan={selectedPlan}
      />

      <SavingsCalculatorModal
        isOpen={calculatorModalOpen}
        onClose={() => setCalculatorModalOpen(false)}
        onBookCall={(plan) => handleOpenBooking(plan)}
      />

      <LegalComplianceModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
        onBookCall={() => handleOpenBooking()}
      />

      <AdminPortalModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}
