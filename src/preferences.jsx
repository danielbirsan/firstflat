import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { applyAnalyticsConsent, trackAccessContinue } from './analytics.js';
import { readStorage, writeStorage } from './storage.js';

const languageKey = 'firstflat-language';
const themeKey = 'firstflat-theme';
const consentKey = 'firstflat.analytics-consent';

function hasConsentChoice(consent) {
  return consent === 'granted' || consent === 'denied';
}

export function usePreferences() {
  const [language, updateLanguage] = useState(() =>
    readStorage('localStorage', languageKey) === 'en' ? 'en' : 'ro',
  );
  const [theme, updateTheme] = useState(() =>
    readStorage('localStorage', themeKey) === 'dark' ? 'dark' : 'light',
  );
  const [cookieBannerOpen, setCookieBannerOpen] = useState(() =>
    !hasConsentChoice(readStorage('localStorage', consentKey)),
  );
  const settingsOpener = useRef(null);

  useLayoutEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#19231e' : '#f6f5ef';
  }, [theme]);

  useEffect(() => {
    applyAnalyticsConsent(readStorage('localStorage', consentKey));

    function syncConsent(event) {
      if (event.storageArea !== window.localStorage) return;
      if (event.key !== consentKey && event.key !== null) return;
      const consent = readStorage('localStorage', consentKey);
      applyAnalyticsConsent(consent);
      setCookieBannerOpen(!hasConsentChoice(consent));
    }

    window.addEventListener('storage', syncConsent);
    document.addEventListener('firstflat:accesscontinue', trackAccessContinue);
    return () => {
      window.removeEventListener('storage', syncConsent);
      document.removeEventListener('firstflat:accesscontinue', trackAccessContinue);
    };
  }, []);

  useLayoutEffect(() => {
    if (cookieBannerOpen && settingsOpener.current) {
      document.querySelector('#cookie-banner [data-consent="denied"]')?.focus();
    }
  }, [cookieBannerOpen]);

  function setLanguage(selected) {
    updateLanguage(selected);
    writeStorage('localStorage', languageKey, selected);
  }

  function toggleTheme() {
    const selected = theme === 'dark' ? 'light' : 'dark';
    updateTheme(selected);
    writeStorage('localStorage', themeKey, selected);
  }

  function openCookieSettings(event) {
    settingsOpener.current = event.currentTarget;
    if (cookieBannerOpen) {
      document.querySelector('#cookie-banner [data-consent="denied"]')?.focus();
    }
    setCookieBannerOpen(true);
  }

  function chooseConsent(consent) {
    writeStorage('localStorage', consentKey, consent);
    applyAnalyticsConsent(consent);
    setCookieBannerOpen(false);
    settingsOpener.current?.focus();
    settingsOpener.current = null;
  }

  return { language, setLanguage, theme, toggleTheme, cookieBannerOpen, openCookieSettings, chooseConsent };
}

export function LanguagePicker({ language, setLanguage }) {
  return (
    <div className="language-picker" role="group" aria-label={language === 'en' ? 'Page language' : 'Limba paginii'}>
      <button type="button" data-language="ro" lang="ro" aria-label="Română" aria-pressed={language === 'ro'} onClick={() => setLanguage('ro')}>RO</button>
      <button type="button" data-language="en" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
    </div>
  );
}

export function ThemeToggle({ language, theme, toggleTheme }) {
  return (
    <button
      className="theme-toggle"
      type="button"
      data-theme-toggle=""
      aria-pressed={theme === 'dark'}
      aria-label={language === 'en' ? 'Dark theme' : 'Temă întunecată'}
      onClick={toggleTheme}
    />
  );
}

export function CookieBanner({ language, open, chooseConsent }) {
  const t = (ro, en) => language === 'en' ? en : ro;

  return (
    <aside className="cookie-banner" id="cookie-banner" hidden={!open} aria-labelledby="cookie-title">
      <div className="cookie-heading">
        <svg className="icon" aria-hidden="true"><use href="#i-lock" /></svg>
        <h2 id="cookie-title">{t('Analiză opțională', 'Optional analytics')}</h2>
      </div>
      <p>{t(
        'Cu acordul tău, folosim cookie-uri opționale și stocarea din browser pentru a afla de unde vin vizitatorii și cum ajung la formular. Poți schimba oricând alegerea.',
        'If you agree, we use optional cookies and browser storage to measure where visits come from and how people reach the form. You can change your choice at any time.',
      )}</p>
      <div className="cookie-actions">
        <button type="button" className="button button-secondary" data-consent="denied" onClick={() => chooseConsent('denied')}>
          {t('Refuză cookie-urile opționale', 'Reject optional cookies')}
        </button>
        <button type="button" className="button button-dark" data-consent="granted" onClick={() => chooseConsent('granted')}>
          {t('Acceptă cookie-urile opționale', 'Accept optional cookies')}
        </button>
      </div>
    </aside>
  );
}
