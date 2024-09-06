function OnlyPositiveNumbers(str: string): string {
  /*
   * Returns only the numbers in a string
   */

  //The regex matches any non-digit character except dot
  return str.replace(/[^\d.]/g, "");
}

function getFloatValue(inputId: string): number {
  /*
   * Parses an string input value to float.
   */
  const inputValue = (document.getElementById(inputId) as HTMLInputElement)
    .value;
  if (inputValue == "") {
    return 0.0;
  }
  return parseFloat(inputValue);
}

export function updateOutput(elementId: string, value: number): void {
  (document.getElementById(elementId) as HTMLInputElement).value =
    value.toString();
}

export { getFloatValue, OnlyPositiveNumbers };
