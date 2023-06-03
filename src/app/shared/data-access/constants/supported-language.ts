import { Language } from '../models/language';

export const SupportedLanguage: { [key: string]: Language } = {
  ENGLISH: {
    nameKey: 'language.english',
    translocoCode: 'en',
    code: 'us',
  },
  POLISH: {
    nameKey: 'language.english',
    translocoCode: 'pl',
    code: 'pl',
  },
};

export type SupportedLanguage = keyof typeof SupportedLanguage;
