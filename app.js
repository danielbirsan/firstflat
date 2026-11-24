"use strict";

const accessForm = document.querySelector("#access-form");

if (accessForm) {
  const roleStep = accessForm.querySelector('[data-form-step="role"]');
  const detailsStep = accessForm.querySelector('[data-form-step="details"]');
  const nextButton = accessForm.querySelector("[data-form-next]");
  const backButton = accessForm.querySelector("[data-form-back]");
  const roles = [...accessForm.querySelectorAll('[name="entry.461125814"]')];
  const nameField = accessForm.elements.namedItem("entry.464851562");
  const emailField = accessForm.elements.namedItem("entry.709261515");

  const english = () => document.documentElement.lang.startsWith("en");
  const selectedRole = () => roles.find((role) => role.checked);

  function showDetails(visible) {
    roleStep.hidden = visible;
    detailsStep.hidden = !visible;
    nameField.disabled = !visible;
    emailField.disabled = !visible;
  }

  function validateRole() {
    const message = english()
      ? "Choose renter or property owner."
      : "Alege dacă ești chiriaș sau proprietar.";
    roles[0].setCustomValidity(selectedRole() ? "" : message);
    return roles[0].reportValidity();
  }

  function validateName() {
    const message = english() ? "Enter your name." : "Introdu numele tău.";
    nameField.setCustomValidity(nameField.value.trim() ? "" : message);
    return nameField.reportValidity();
  }

  function advanceToDetails() {
    if (validateRole()) {
      showDetails(true);
      nameField.focus();
    }
  }

  showDetails(false);
  accessForm.hidden = false;
  nextButton.addEventListener("click", advanceToDetails);
  backButton.addEventListener("click", () => {
    showDetails(false);
    (selectedRole() || roles[0]).focus();
  });

  roleStep.addEventListener("change", () => roles[0].setCustomValidity(""));
  nameField.addEventListener("input", () => nameField.setCustomValidity(""));
  document.addEventListener("firstflat:languagechange", () => {
    if (roles[0].validity.customError) validateRole();
    if (nameField.validity.customError) validateName();
  });

  accessForm.addEventListener("submit", (event) => {
    if (detailsStep.hidden) {
      event.preventDefault();
      advanceToDetails();
      return;
    }

    if (!validateName()) {
      event.preventDefault();
      return;
    }

    nameField.value = nameField.value.trim();
    // Track the attempt before the browser submits to Google Forms.
    document.dispatchEvent(new Event("firstflat:accesscontinue"));
  });
}
