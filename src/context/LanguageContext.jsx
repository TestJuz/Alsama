import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { setI18nLanguage, translateText } from "../lib/nativeI18n";

export const languages = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "es", label: "Español", shortLabel: "ES" },
  { code: "fr", label: "Français", shortLabel: "FR" }
];

const STORAGE_KEY = "alsama-language";
const DEFAULT_LANGUAGE = "en";
const LanguageContext = createContext(null);
const textRecords = new WeakMap();
const attributeRecords = new WeakMap();
const translatedAttributes = ["placeholder", "aria-label", "title", "alt", "data-label"];
const skippedTags = ["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "SVG"];

function getStoredLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return languages.some((item) => item.code === stored) ? stored : DEFAULT_LANGUAGE;
}

function shouldSkipElement(element) {
  return skippedTags.includes(element.tagName) || Boolean(element.closest("[data-no-translate]"));
}

function shouldSkipTextNode(node) {
  return !node.parentElement || shouldSkipElement(node.parentElement);
}

function getUpdatedSource(record, currentValue) {
  if (!record) return currentValue;
  if (currentValue !== record.source && currentValue !== record.translated) return currentValue;
  return record.source;
}

function translateTextNode(node, language) {
  if (shouldSkipTextNode(node)) return;
  const record = textRecords.get(node);
  const source = getUpdatedSource(record, node.nodeValue);
  const trimmed = source.replace(/\s+/g, " ").trim();
  if (!trimmed || !/[A-Za-z]/.test(trimmed)) return;

  const translated = language === "en" ? source : source.replace(trimmed, translateText(trimmed, language));
  textRecords.set(node, { source, translated });
  if (node.nodeValue !== translated) node.nodeValue = translated;
}

function translateElementAttributes(element, language) {
  if (shouldSkipElement(element)) return;
  translatedAttributes.forEach((name) => {
    if (!element.hasAttribute(name)) return;
    let store = attributeRecords.get(element);
    if (!store) {
      store = {};
      attributeRecords.set(element, store);
    }

    const record = store[name];
    const source = getUpdatedSource(record, element.getAttribute(name));
    const translated = language === "en" ? source : translateText(source, language);
    store[name] = { source, translated };
    if (element.getAttribute(name) !== translated) element.setAttribute(name, translated);
  });
}

function translateTree(root, language) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root, language);
    return;
  }

  if (root.nodeType !== Node.ELEMENT_NODE || shouldSkipElement(root)) return;
  translateElementAttributes(root, language);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (node.nodeType === Node.ELEMENT_NODE && shouldSkipElement(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, language);
    if (node.nodeType === Node.ELEMENT_NODE) translateElementAttributes(node, language);
    node = walker.nextNode();
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getStoredLanguage);
  const location = useLocation();

  useEffect(() => {
    setI18nLanguage(language);
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
    translateTree(document.body, language);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => translateTree(node, language));
        if (mutation.type === "characterData") translateTree(mutation.target, language);
        if (mutation.type === "attributes") translateTree(mutation.target, language);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: translatedAttributes
    });

    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    const routeTranslateTimer = window.setTimeout(() => translateTree(document.body, language), 0);
    return () => window.clearTimeout(routeTranslateTimer);
  }, [language, location.pathname, location.hash]);
  const value = useMemo(() => ({ language, setLanguage, languages, t: (text) => translateText(text, language) }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}