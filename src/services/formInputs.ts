export function getFloatValue(inputId: string): number {
  return parseFloat(
    (document.getElementById(inputId) as HTMLInputElement).value,
  );
}

export function updateOutput(elementId: string, value: number): void {
  (document.getElementById(elementId) as HTMLInputElement).value =
    value.toString();
}
