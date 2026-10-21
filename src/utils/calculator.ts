/**
 * Sirenexis Pure Business & Calculation Logic
 * Dedicated customer support ROI vs UK in-house hiring
 */

export interface SavingsResult {
  sirenexisMonthlyCost: number;
  ukInHouseMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercent: number;
}

export interface BookingFormData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  phone: string;
  weeklyEnquiries: string;
  channels: string[];
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Calculates comparative cost of Sirenexis dedicated specialist vs UK internal hire
 * Part-time: £1,495/mo (20 hrs/wk)
 * Full-time: £2,495/mo (40 hrs/wk)
 * UK Hire benchmark: £18-£22/hr base wage + 13.8% Employer NI + 3% Workplace Pension + £250/mo equipment/workstation
 */
export function calculateSupportEconomics(
  planType: 'part-time' | 'full-time',
  ukBaseHourlyWage: number = 20
): SavingsResult {
  const isPartTime = planType === 'part-time';
  const sirenexisMonthlyCost = isPartTime ? 1495 : 2495;
  const hoursPerWeek = isPartTime ? 20 : 40;
  const weeksPerMonth = 4.333; // 52 / 12
  
  // Base monthly UK wage
  const monthlyWage = ukBaseHourlyWage * hoursPerWeek * weeksPerMonth;
  // Employer NI (13.8%) + Pension (3.0%) = 16.8%
  const onCosts = monthlyWage * 0.168;
  // IT workstation, software licenses & desk overhead
  const infrastructureCost = isPartTime ? 200 : 350;
  
  const ukInHouseMonthlyCost = Math.round(monthlyWage + onCosts + infrastructureCost);
  const monthlySavings = Math.max(0, ukInHouseMonthlyCost - sirenexisMonthlyCost);
  const annualSavings = monthlySavings * 12;
  const savingsPercent = Math.round((monthlySavings / ukInHouseMonthlyCost) * 100);

  return {
    sirenexisMonthlyCost,
    ukInHouseMonthlyCost,
    monthlySavings,
    annualSavings,
    savingsPercent,
  };
}

/**
 * Validates consultation booking request
 */
export function validateBookingForm(data: BookingFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.businessEmail || !emailRegex.test(data.businessEmail.trim())) {
    errors.businessEmail = 'Please provide a valid business email address';
  }

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Please enter your business or company name';
  }

  const cleanPhone = data.phone?.replace(/[\s\-\(\)]/g, '') || '';
  if (!cleanPhone || cleanPhone.length < 8) {
    errors.phone = 'Please provide a valid phone number';
  }

  if (!data.channels || data.channels.length === 0) {
    errors.channels = 'Select at least one support channel';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats GBP currency cleanly
 */
export function formatGbp(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount);
}
