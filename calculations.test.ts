import { calculateCompoundInterest } from "./src/services/calculations";

type CalculationDataSet = [
  result: number,
  compoundsPerYear: number,
  monthlyAddition?: number,
];

describe.each<CalculationDataSet>([
  [4940.625, 1, 100], // Annually
  [4992.335, 2, 100], // SemiAnnually
  [5018.863, 4, 100], // Quartarly
  [5036.806, 12, 100], // Monthly
])(
  "Calculate compound interests",
  (result, compoundsPerYear, monthlyAddition) => {
    describe("calculate compund interests correctly", () => {
      test(`calculates compound interest correctly with monthly addition ${monthlyAddition}, principal 1000, 5% interest rate, 4 times annually for 3 years.`, () => {
        const principal = 1000;
        const annualRate = 0.05;
        const years = 3;

        const expectedAmount = result;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years,
          monthlyAddition
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });

      test("calculates compound interest correctly with principal 1500, 10% interest rate, 3 times annually for 5 years.", () => {
        const principal = 1500;
        const annualRate = 0.1;
        const compoundsPerYear = 3;
        const years = 5;

        const expectedAmount = 2453.002;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });
    });

    describe("calculate negative compound interests correctly", () => {
      test("calculates compound interest correctly with principal 1500, -0.02% interest rate, \
       3 times annually for 5 years.", () => {
        const principal = 1500;
        const annualRate = -0.02;
        const compoundsPerYear = 3;
        const years = 5;

        const expectedAmount = 1356.802;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });
    });

    describe("calculate with 0 values", () => {
      test("calculates compound interest correctly with principal 0", () => {
        const principal = 0;
        const annualRate = 0.05;
        const compoundsPerYear = 4;
        const years = 3;

        const expectedAmount = 0;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });

      test("calculates compound interest correctly with 0% interest rate", () => {
        const principal = 1000;
        const annualRate = 0;
        const compoundsPerYear = 4;
        const years = 3;

        const expectedAmount = 1000;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });

      test("calculates compound interest correctly with 0 compounds per year", () => {
        const principal = 1000;
        const annualRate = 0.05;
        const compoundsPerYear = 0;
        const years = 3;

        const expectedAmount = 1000;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });

      test("calculates compound interest correctly with 0 years", () => {
        const principal = 1000;
        const annualRate = 0.05;
        const compoundsPerYear = 4;
        const years = 0;

        const expectedAmount = 1000;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });

      test("calculates compound interest correctly with all parameters zero", () => {
        const principal = 0;
        const annualRate = 0;
        const compoundsPerYear = 0;
        const years = 0;

        const expectedAmount = 0;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });
    });

    describe("calculate with bizarre values", () => {
      test("calculates compound interest correctly with high frequency compounding and many years", () => {
        const principal = 1000;
        const annualRate = 0.05;
        const compoundsPerYear = 365;
        const years = 100;

        const expectedAmount = 148362.346;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });

      test("calculates compound interest correctly with negative principal, expecting it grows negatively", () => {
        const principal = -1000;
        const annualRate = 0.05;
        const compoundsPerYear = 4;
        const years = 3;

        const expectedAmount = -1160.755;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });

      test("calculates compound interest correctly with extremely high interest rate", () => {
        const principal = 1000;
        const annualRate = 3;
        const compoundsPerYear = 4;
        const years = 3;

        const expectedAmount = 825005.007;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBe(expectedAmount);
      });

      test("calculates compound interest with fractional compounding periods", () => {
        const principal = 1000;
        const annualRate = 0.05;
        const compoundsPerYear = 2.5;
        const years = 3;

        const expectedAmount = 1160.12;

        const calculatedAmount = calculateCompoundInterest(
          principal,
          annualRate,
          compoundsPerYear,
          years
        );

        expect(calculatedAmount).toBeCloseTo(expectedAmount, 2);
      });
    });
  }
);
