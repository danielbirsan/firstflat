"use strict";

const languagePicker = document.querySelector(".language-picker");
const languageButtons = languagePicker.querySelectorAll("[data-language]");
const translations = [
  { data: "data-en", attribute: null },
  { data: "data-en-label", attribute: "aria-label" },
  { data: "data-en-content", attribute: "content" },
].flatMap(({ data, attribute }) =>
  Array.from(document.querySelectorAll(`[${data}]`), (element) => ({
    element,
    attribute,
    ro: attribute ? element.getAttribute(attribute) : element.textContent,
    en: element.getAttribute(data),
  })),
);

function setLanguage(language) {
  document.documentElement.lang = language;
  for (const translation of translations) {
    const { element, attribute } = translation;
    if (attribute) {
      element.setAttribute(attribute, translation[language]);
    } else {
      element.textContent = translation[language];
    }
  }
  for (const button of languageButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  }
  document.dispatchEvent(new Event("firstflat:languagechange"));
}

let savedLanguage;
try {
  savedLanguage = localStorage.getItem("firstflat-language");
} catch {
  // Language switching still works for the current page if storage is unavailable.
}
setLanguage(savedLanguage === "en" ? "en" : "ro");
languagePicker.hidden = false;

for (const button of languageButtons) {
  button.addEventListener("click", () => {
    const { language } = button.dataset;
    setLanguage(language);
    try {
      localStorage.setItem("firstflat-language", language);
    } catch {
      // Keep the selection for the current page.
    }
  });
}
