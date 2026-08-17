import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className="language-switcher" aria-label="Language selector" data-no-translate>
      <Languages size={16} aria-hidden="true" />
      <div className="language-switcher__buttons" role="group" aria-label="Language">
        {languages.map((item) => (
          <button
            key={item.code}
            type="button"
            className={item.code === language ? "language-switcher__button language-switcher__button--active" : "language-switcher__button"}
            aria-pressed={item.code === language}
            onClick={() => setLanguage(item.code)}
            title={item.label}
          >
            {item.shortLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
