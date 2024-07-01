const { fireEvent } = require("@testing-library/dom");
import fs from "fs";
import path from "path";

const html: string = fs.readFileSync(
  path.resolve(__dirname, "./build/index.html"),
  "utf8",
);
document.body.innerHTML = html;

import "./src/main";

let principal: HTMLInputElement;
let rate: HTMLInputElement;
let compounding: HTMLInputElement;
let time: HTMLInputElement;
let finalAmount: HTMLInputElement;
let calculateButt: HTMLInputElement;

beforeEach(() => {
  principal = document.getElementById("principal") as HTMLInputElement;
  rate = document.getElementById("rate") as HTMLInputElement;
  compounding = document.getElementById("compounding") as HTMLInputElement;
  time = document.getElementById("time") as HTMLInputElement;
  finalAmount = document.getElementById("finalAmount") as HTMLInputElement;
  calculateButt = document.getElementById("calculate") as HTMLInputElement;

  // Reset input values
  principal.value = "";
  rate.value = "";
  compounding.value = "";
  time.value = "";
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
