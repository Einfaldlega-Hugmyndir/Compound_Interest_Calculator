import initializeValidation from "./formValidationPreventSubmit";
import { calculateCompoundInterest } from "./services/calculations";
import { getFloatValue, updateOutput } from "./services/formInputs";

initializeValidation();

const form: HTMLFormElement = document.getElementById(
  "compoundInterestForm",
) as HTMLFormElement;

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event: Event): void {
  event.preventDefault();

  const principal: number = getFloatValue("principal");
  const rate: number = getFloatValue("rate") / 100;
  const compounding: number = getFloatValue("compounding");
  const time: number = getFloatValue("time");
  const finalAmount: number = calculateCompoundInterest(
    principal,
    rate,
    compounding,
    time,
  );

  if (form.checkValidity() === true) {
    updateOutput("finalAmount", finalAmount);
  }
}
