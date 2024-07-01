//Prevent submit when Bootstrap validates the inputs.

const initializeValidation = (): void => {
  "use strict";

  const forms: NodeListOf<HTMLFormElement> =
    document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form: HTMLFormElement) => {
    form.addEventListener(
      "submit",
      (event: Event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
};

export default initializeValidation;
