'use strict';

((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SlimCalculatorMath = api;
})(typeof window !== 'undefined' ? window : globalThis, () => {
  const inRange = (value, min, max) => typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;

  function calculate(input) {
    if (!input || typeof input !== 'object') return null;
    const { hours, rate, reduction, weeks } = input;
    if (!inRange(hours, 0, 1000) || !inRange(rate, 0, 1000) || !inRange(reduction, 0, 100) || !inRange(weeks, 1, 52)) return null;

    const weeklyFreedHours = hours * reduction / 100;
    const annualFreedHours = weeklyFreedHours * weeks;
    const annualCurrentHours = hours * weeks;
    const weeklyRemainingHours = hours * (1 - reduction / 100);
    return {
      weeklyFreedHours,
      annualFreedHours,
      // Capacity value represents time at the entered internal hourly cost, not cash savings or profit.
      annualCapacityValue: annualFreedHours * rate,
      annualCurrentHours,
      annualCurrentCost: annualCurrentHours * rate,
      weeklyRemainingHours,
      annualRemainingCost: weeklyRemainingHours * weeks * rate
    };
  }

  return Object.freeze({ calculate });
});
