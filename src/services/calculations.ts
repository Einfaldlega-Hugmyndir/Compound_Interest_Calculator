export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  compoundsPerYear: number,
  years: number,
): number {
  //Formula: A = principal * ((1 + (annualRate / compoundsPerYear)) ^ (compoundsPerYear * years))
  const compound_times_years: number = compoundsPerYear * years;
  const rate_div_compounds_per_year: number = annualRate / compoundsPerYear;
  const A: number =
    principal * Math.pow(1 + rate_div_compounds_per_year, compound_times_years);
  return parseFloat(A.toFixed(3));
}
