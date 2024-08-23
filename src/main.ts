import initializeValidation from "./formValidationPreventSubmit";
import {calculateCompoundInterest, calculateVariance} from "./services/calculations";
import { getFloatValue, updateOutput } from "./services/formInputs";

initializeValidation();

const form: HTMLFormElement = document.getElementById("compoundInterestForm") as HTMLFormElement;

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event: Event): void {
  event.preventDefault();

  const principal: number = getFloatValue("principal");
  const rate: number = getFloatValue("rate");
  const compounding: number = getFloatValue("compounding");
  const time: number = getFloatValue("time");
  const variance: number = getFloatValue("variance");
  const finalAmount: number = calculateCompoundInterest(
    principal,
    rate / 100,
    compounding,
    time
  );

  const calculatedVariance = calculateVariance(
    principal,
    rate,
    compounding,
    time,
    variance
  )
 
  if (form.checkValidity() === true) {
    updateOutput("finalAmount", finalAmount);
    updateOutput("finalAmountVarianceAbove", calculatedVariance.total_above);
    updateOutput("finalAmountVarianceBelow", calculatedVariance.total_below);
  }
}
