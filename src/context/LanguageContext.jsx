import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const languages = [
  { code: "en", label: "English", shortLabel: "EN", googleCode: "en" },
  { code: "es", label: "Espanol", shortLabel: "ES", googleCode: "es" },
  { code: "fr", label: "Francais", shortLabel: "FR", googleCode: "fr" }
];

const DEFAULT_LANGUAGE = "en";
const STORAGE_KEY = "alsama-language";
const GOOGLE_SCRIPT_ID = "google-translate-script";
const LanguageContext = createContext(null);

function getStoredLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return languages.some((language) => language.code === stored) ? stored : DEFAULT_LANGUAGE;
}

function setGoogleTranslateCookie(languageCode) {
  const googleCode = languages.find((language) => language.code === languageCode)?.googleCode || DEFAULT_LANGUAGE;
  const value = `/en/${googleCode}`;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `googtrans=${value};path=/;max-age=${maxAge}`;
  document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname};max-age=${maxAge}`;
}

function triggerGoogleTranslate(languageCode, attempts = 0) {
  const googleCode = languages.find((language) => language.code === languageCode)?.googleCode || DEFAULT_LANGUAGE;
  const combo = document.querySelector(".goog-te-combo");

  if (combo) {
    combo.value = googleCode;
    combo.dispatchEvent(new Event("change"));
    return;
  }

  if (attempts < 20) {
    window.setTimeout(() => triggerGoogleTranslate(languageCode, attempts + 1), 250);
  }
}

function ensureGoogleTranslateScript() {
  if (typeof window === "undefined") return;

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: languages.map((language) => language.googleCode).join(","),
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  if (document.getElementById(GOOGLE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = GOOGLE_SCRIPT_ID;
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getStoredLanguage);

  useEffect(() => {
    ensureGoogleTranslateScript();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
    setGoogleTranslateCookie(language);
    triggerGoogleTranslate(language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, languages }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <div id="google_translate_element" className="google-translate-slot" aria-hidden="true" />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
