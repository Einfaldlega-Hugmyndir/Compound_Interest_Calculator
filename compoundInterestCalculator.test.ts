const { fireEvent } = require("@testing-library/dom");
import fs from "fs";
import path from "path";


document.body.innerHTML = fs.readFileSync(
  path.resolve(__dirname, "./src/index.html"), "utf8");

// This import must be after the inner html has been configured so it can fetch values and inputs.
import "./src/main";

let principal: HTMLInputElement;
let rate: HTMLInputElement;
let compounding: HTMLInputElement;
let time: HTMLInputElement;
let finalAmount: HTMLInputElement;
let variance: HTMLInputElement;
let varianceAboveAmount: HTMLInputElement;
let varianceBelowAmount: HTMLInputElement;
let calculateButt: HTMLInputElement;

beforeEach(() => {
  principal = document.getElementById("principal") as HTMLInputElement;
  rate = document.getElementById("rate") as HTMLInputElement;
  compounding = document.getElementById("compounding") as HTMLInputElement;
  time = document.getElementById("time") as HTMLInputElement;
  finalAmount = document.getElementById("finalAmount") as HTMLInputElement;
  variance = document.getElementById("variance") as HTMLInputElement;
  varianceAboveAmount = document.getElementById(
    "finalAmountVarianceAbove"
  ) as HTMLInputElement;
  varianceBelowAmount = document.getElementById(
    "finalAmountVarianceBelow"
  ) as HTMLInputElement;
  calculateButt = document.getElementById("calculate") as HTMLInputElement;

  // Reset input values
  principal.value = "";
  rate.value = "";
  compounding.value = "";
  time.value = "";
  variance.value = "";
  varianceAboveAmount.value = "";
  varianceBelowAmount.value = "";
  finalAmount.value = "";
});

describe("Compound Interest Calculator", () => {
  describe("Displays Final amount when all values provided", () => {
    test("Correctly calculates final amount", () => {
      principal.value = "50000";
      rate.value = "5";
      time.value = "3";
      compounding.value = "4";

      const calculatedAmount: string = "58037.726";

      fireEvent.click(calculateButt);

      expect(finalAmount.value).toBe(calculatedAmount);
    });
  });

  describe("Displays above variance", () => {
    test("Displays Final amount with above variance", () => {
      principal.value = "50000";
      rate.value = "10";
      time.value = "3";
      compounding.value = "1";
      variance.value = "3";

      const calculatedvarianceAboveAmount: string = "72144.85";

      fireEvent.click(calculateButt);

      expect(varianceAboveAmount.value).toBe(calculatedvarianceAboveAmount);
    });
  });

  describe("Displays below variance", () => {
    test("Displays Final amount with below variance", () => {
      principal.value = "50000";
      rate.value = "10";
      time.value = "3";
      compounding.value = "1";
      variance.value = "3";

      const calculatedvarianceBelowAmount: string = "61252.15";

      fireEvent.click(calculateButt);

      expect(varianceBelowAmount.value).toBe(calculatedvarianceBelowAmount);
    });
  });

  describe("Edge cases", () => {
    describe("Use 'E' for a power (for example 1E3=1^3)", () => {
      test("Principal", () => {
        principal.value = "1E3";
        rate.value = "5";
        time.value = "3";
        compounding.value = "4";
        fireEvent.click(calculateButt);
        expect(finalAmount.value).toBe("1160.755");
      });

      test("Rate", () => {
        principal.value = "50000";
        rate.value = "1E2"; // Represents 100
        time.value = "3";
        compounding.value = "4";
        fireEvent.click(calculateButt);
        expect(finalAmount.value).toBe("727595.761");
      });

      test("Time", () => {
        principal.value = "50000";
        rate.value = "5";
        time.value = "1E1";
        compounding.value = "4";
        fireEvent.click(calculateButt);
        expect(finalAmount.value).toBe("82180.973");
      });

      test("All inputs in powers", () => {
        principal.value = "1E3";
        rate.value = "1E2";
        time.value = "1E1";
        compounding.value = "1";
        fireEvent.click(calculateButt);
        expect(finalAmount.value).toBe("1024000");
      });
    });
  });
});
