import { calculateVariance } from "./src/services/calculations";

const principal = 2500;
const annualRate = 6;
const years = 7;
const compoundsPerYear = 12;
const variance = 3;

describe("calculate with variance", () => {
  test("calculate with variance above", () => {
    const variance_above = calculateVariance(
      principal,
      annualRate,
      compoundsPerYear,
      years,
      variance
    ).total_above;
    expect(variance_above).toBe(4683.005);
  });

  test("calculate with variance below", () => {
    const variance_below = calculateVariance(
      principal,
      annualRate,
      compoundsPerYear,
      years,
      variance
    ).total_below;
    expect(variance_below).toBe(3083.387);
  });

  test("should not accept negative variance", () => {
    const variance = -3;

    const calculate_variance = () => {
      calculateVariance(
        principal,
        annualRate,
        compoundsPerYear,
        years,
        variance
      );
    };

    expect(calculate_variance).toThrow(RangeError);
  });
});
