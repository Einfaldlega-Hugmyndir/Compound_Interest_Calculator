import { calculateVariance } from "./src/services/calculations";

const principal = 2500;
const annualRate = 6;
const years = 7;
const compoundsPerYear = 12;
const variance = 3;

describe("Calculate with variance", () => {
  test("Should return total with variance above", () => {
    const variance_above = calculateVariance(
      principal,
      annualRate,
      compoundsPerYear,
      years,
      variance
    ).total_above;
    expect(variance_above).toBe(4683.005);
  });

  test("Should return total with variance below", () => {
    const variance_below = calculateVariance(
      principal,
      annualRate,
      compoundsPerYear,
      years,
      variance
    ).total_below;
    expect(variance_below).toBe(3083.387);
  });
});

describe("Variance input acceptence", () => {
  test("Should not accept negative variance", () => {
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

  describe("Should accept variance below 1", () => {
    test("Should return total with variance above with variance below 1", () => {
      const variance = 0.1;

      const calculate_variance = calculateVariance(
        principal,
        annualRate,
        compoundsPerYear,
        years,
        variance
      );

      expect(calculate_variance.total_above).toBe(3827.489);
    });
    test("Should return total with variance below with variance below 1", () => {
      const variance = 0.1;

      const calculate_variance = calculateVariance(
        principal,
        annualRate,
        compoundsPerYear,
        years,
        variance
      );
      expect(calculate_variance.total_below).toBe(3774.541);
    });
  });
});
