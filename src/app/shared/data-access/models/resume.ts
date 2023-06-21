import { SupportedLanguage } from '../constants/supported-language';

export interface Resume {
  id: string;
  name: string;
  language: SupportedLanguage;
  data: any;
}
