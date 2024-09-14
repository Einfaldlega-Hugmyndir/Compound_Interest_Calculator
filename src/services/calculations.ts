function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  compoundsPerYear: number,
  years: number,
  monthlyAddition?: number
): number {
  //Formula: A = principal * ((1 + (annualRate / compoundsPerYear)) ^ (compoundsPerYear * years))
  let compound_times_years: number = compoundsPerYear * years;
  let rate_div_compounds_per_year: number = annualRate / compoundsPerYear;
  let total: number =
    principal * Math.pow(1 + rate_div_compounds_per_year, compound_times_years);

  if (monthlyAddition) {
    for (let i = 1; i <= years * 12; i++) {
      // Calculate how many full years are left from this month's contribution until the end
      let monthsLeft = years * 12 - i;
      let compoundPeriodsRemaining = Math.floor(
        (monthsLeft / 12) * compoundsPerYear
      );
      // Add the compounded value of each monthly contribution
      total +=
        monthlyAddition *
        Math.pow(1 + rate_div_compounds_per_year, compoundPeriodsRemaining);
    }
  }

  return parseFloat(total.toFixed(3));
}

function calculateVariance(
  principal: number,
  annualRate: number,
  compoundsPerYear: number,
  years: number,
  variance: number,
  monthlyAddition?: number
): { total_above: number; total_below: number } {
  if (variance < 0) {
    throw new RangeError("Variance must be positive.");
  }

  const annualRateAbove = annualRate + variance;
  const annualRateBelow = annualRate - variance;
  const total_above = calculateCompoundInterest(
    principal,
    annualRateAbove / 100,
    compoundsPerYear,
    years,
    monthlyAddition
  );

  const total_below = calculateCompoundInterest(
    principal,
    annualRateBelow / 100,
    compoundsPerYear,
    years,
    monthlyAddition
  );
  return { total_above: total_above, total_below: total_below };
}

export { calculateCompoundInterest, calculateVariance };
