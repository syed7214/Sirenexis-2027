import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSupportEconomics, validateBookingForm, formatGbp } from './calculator';

test('calculateSupportEconomics computes realistic savings for part-time plan', () => {
  const result = calculateSupportEconomics('part-time', 20);
  assert.equal(result.sirenexisMonthlyCost, 1495);
  assert.ok(result.ukInHouseMonthlyCost > 2000, 'UK in-house cost should exceed £2,000');
  assert.ok(result.monthlySavings > 500, 'Monthly savings should be positive and substantial');
  assert.ok(result.annualSavings > 6000, 'Annual savings should exceed £6,000');
  assert.ok(result.savingsPercent >= 25, 'Savings percentage should be at least 25%');
});

test('calculateSupportEconomics computes realistic savings for full-time plan', () => {
  const result = calculateSupportEconomics('full-time', 22);
  assert.equal(result.sirenexisMonthlyCost, 2495);
  assert.ok(result.ukInHouseMonthlyCost > 4000, 'Full time UK in house cost should exceed £4,000');
  assert.ok(result.monthlySavings > 1500, 'Monthly savings should exceed £1,500');
  assert.ok(result.annualSavings > 18000, 'Annual savings should exceed £18,000');
});

test('validateBookingForm validates correctly', () => {
  const invalid = validateBookingForm({
    fullName: '',
    businessEmail: 'not-an-email',
    companyName: '',
    phone: '123',
    weeklyEnquiries: '50-100',
    channels: [],
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.businessEmail);
  assert.ok(invalid.errors.companyName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.channels);

  const valid = validateBookingForm({
    fullName: 'Oliver Hughes',
    businessEmail: 'oliver@mayfairlettings.co.uk',
    companyName: 'Mayfair Lettings Ltd',
    phone: '+44 20 7946 0912',
    weeklyEnquiries: '100-250',
    channels: ['Email Support', 'Live Chat'],
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('formatGbp formats properly', () => {
  assert.equal(formatGbp(1495), '£1,495');
  assert.equal(formatGbp(2495), '£2,495');
});
