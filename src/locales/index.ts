import { defaultLanguage } from '../constants/shared';
import en from './en';
import rw from './rw';
import fr from './fr';

interface ILocale {
  [index: string]: any;
}
const locales: ILocale = {
  en,
  rw,
  fr,
};

export default (key: string, locale = defaultLanguage): string => {
  if (!locales[locale]) throw new Error("Locale doesn't exist");

  if (!locales[locale][key]) throw new Error(`Translation for ${key} isn't available`);

  return locales[locale][key];
};
