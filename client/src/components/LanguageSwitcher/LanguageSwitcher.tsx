import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import './LanguageSwitcher.css';

const LANGUAGES = [
  { code: 'pt-BR', label: 'PT-BR', flagUrl: 'https://flagcdn.com/w40/br.png' },
  { code: 'en', label: 'EN', flagUrl: 'https://flagcdn.com/w40/us.png' },
  { code: 'es', label: 'ES', flagUrl: 'https://flagcdn.com/w40/es.png' },
  { code: 'de', label: 'DE', flagUrl: 'https://flagcdn.com/w40/de.png' },
  { code: 'fr', label: 'FR', flagUrl: 'https://flagcdn.com/w40/fr.png' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="language-switcher-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Trocar idioma"
      >
        <img src={currentLang.flagUrl} alt={currentLang.label} className="lang-flag-img" />
        <span className="lang-label">{currentLang.label}</span>
        <span className="lang-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown fade-in-up">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${currentLang.code === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <img src={lang.flagUrl} alt={lang.label} className="lang-flag-img" />
              <span className="lang-name">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
