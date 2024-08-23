function calculateCompoundInterest(
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

function calculateVariance(
  principal: number,
  annualRate: number,
  compoundsPerYear: number,
  years : number,
  variance : number
) : { total_above: number; total_below: number } {
  if(variance < 0) {
    throw new RangeError("Variance must be positive.");
  }
  const annualRateAbove = annualRate + variance;
  const annualRateBelow = annualRate - variance;
  const total_above = calculateCompoundInterest(principal, (annualRateAbove/100), 
                                                compoundsPerYear, 
                                                years)
  const total_below = calculateCompoundInterest(principal, (annualRateBelow/100), 
                                                compoundsPerYear, 
                                                years)
  return {"total_above" : total_above, 
          "total_below": total_below
   };
}

export {calculateCompoundInterest, calculateVariance}