import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { AccessConfirmation } from "./AccessForm.jsx";
import Icons from "./Icons.jsx";
import Landing from "./Landing.jsx";
import { CookieBanner, LanguagePicker, ThemeToggle, usePreferences } from "./preferences.jsx";

const confirmationHash = "#confirmare";

function subscribeToHash(callback) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function isConfirmationPage() {
  return window.location.hash === confirmationHash;
}

function Brand() {
  return (
    <a className="brand" href="#top">
      <span className="brand-mark"><svg className="icon" aria-hidden="true"><use href="#i-home" /></svg></span>
      <span>firstflat<span className="brand-period">.</span></span>
    </a>
  );
}

export default function App() {
  const confirmation = useSyncExternalStore(subscribeToHash, isConfirmationPage);
  const { language, setLanguage, theme, toggleTheme, cookieBannerOpen, openCookieSettings, chooseConsent } = usePreferences();
  const t = (ro, en) => language === "en" ? en : ro;

  useEffect(() => {
    document.title = confirmation
      ? (language === "en" ? "Thank you — FirstFlat" : "Mulțumim — FirstFlat")
      : (language === "en" ? "FirstFlat — Your home, in order" : "FirstFlat — Locuința ta, în ordine");
    document.querySelector('meta[name="description"]').content = language === "en"
      ? "FirstFlat brings your home's bills, documents and important dates together."
      : "FirstFlat aduce într-un singur loc facturile, documentele și termenele locuinței tale.";
  }, [confirmation, language]);

  useLayoutEffect(() => {
    if (confirmation) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      const anchor = document.getElementById(window.location.hash.slice(1));
      anchor?.scrollIntoView({ behavior: "instant" });
    }
  }, [confirmation]);

  return (
    <>
      <Icons />
      <a className="skip-link" href={confirmation ? "#confirmation-content" : "#main"}
        onClick={confirmation ? (event) => {
          event.preventDefault();
          document.getElementById("confirmation-content").focus();
        } : undefined}>
        {t("Sari la conținut", "Skip to content")}
      </a>
      <header className="site-header">
        <nav className="container nav" aria-label={t("Navigare principală", "Main navigation")}>
          <Brand />
          <div className="nav-links">
            <a href="#features">{t("Ce poți face", "What you can do")}</a>
            <a href="#how-it-works">{t("Cum funcționează", "How it works")}</a>
          </div>
          <div className="nav-actions">
            <LanguagePicker language={language} setLanguage={setLanguage} />
            <ThemeToggle language={language} theme={theme} toggleTheme={toggleTheme} />
            <a href="#access" className="nav-cta">{t("Cere acces", "Request access")}</a>
          </div>
        </nav>
      </header>

      {confirmation
        ? (
          <main id="confirmation-content" tabIndex={-1}>
            <AccessConfirmation language={language} />
          </main>
        )
        : <Landing language={language} t={t} onSubmitted={() => { window.location.hash = confirmationHash; }} />}

      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand />
          <nav aria-label={t("Linkuri utile", "Useful links")}>
            <a href="#access">{t("Cere acces", "Request access")}</a>
            <button type="button" className="text-button" data-cookie-settings onClick={openCookieSettings}>
              {t("Setări cookie", "Cookie settings")}
            </button>
          </nav>
        </div>
      </footer>
      <CookieBanner language={language} open={cookieBannerOpen} chooseConsent={chooseConsent} />
    </>
  );
}
