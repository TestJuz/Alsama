import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const switcherRef = useRef(null);
  const activeLanguage = languages.find((item) => item.code === language) || languages[0];

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!switcherRef.current?.contains(event.target)) setOpen(false);
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  function chooseLanguage(code) {
    setLanguage(code);
    setOpen(false);
  }

  return (
    <div ref={switcherRef} className="language-switcher" aria-label="Language selector" data-no-translate>
      <button
        className="language-switcher__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        title={activeLanguage.label}
      >
        <span className={`language-switcher__flag language-switcher__flag--${activeLanguage.code}`} aria-hidden="true" />
        <span className="language-switcher__code">{activeLanguage.shortLabel}</span>
        <ChevronDown className="language-switcher__chevron" size={16} aria-hidden="true" />
      </button>

      <div className="language-switcher__menu" role="listbox" data-open={open ? "true" : "false"} aria-label="Language options">
        {languages.map((item) => (
          <button
            key={item.code}
            type="button"
            className={item.code === language ? "language-switcher__option language-switcher__option--active" : "language-switcher__option"}
            role="option"
            aria-selected={item.code === language}
            onClick={() => chooseLanguage(item.code)}
          >
            <span className={`language-switcher__flag language-switcher__flag--${item.code}`} aria-hidden="true" />
            <span>{item.shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}