export function getFloatValue(inputId: string): number {
  const inputValue = (document.getElementById(inputId) as HTMLInputElement).value 
  if(inputValue == "") {
    return 0;
  }

  return parseFloat(
    (document.getElementById(inputId) as HTMLInputElement).value,
  );
}

export function updateOutput(elementId: string, value: number): void {
  (document.getElementById(elementId) as HTMLInputElement).value =
    value.toString();
}
