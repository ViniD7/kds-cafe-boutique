import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptTranslation from './locales/pt.json';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import deTranslation from './locales/de.json';
import frTranslation from './locales/fr.json';

const resources = {
  'pt-BR': {
    translation: ptTranslation
  },
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  de: {
    translation: deTranslation
  },
  fr: {
    translation: frTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en', 'es', 'de', 'fr'],
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
