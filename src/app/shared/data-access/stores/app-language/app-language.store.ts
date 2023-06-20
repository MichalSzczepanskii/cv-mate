import { SupportedLanguage } from '../../constants/supported-language';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { LocalStorageKey } from '../../constants/local-storage-key';
import { Observable } from 'rxjs';

export interface AppLanguageState {
  language: SupportedLanguage;
}

export const appLanguageInitialState: AppLanguageState = {
  language: Object.keys(SupportedLanguage)[0],
};

@Injectable()
export class AppLanguageStore extends ComponentStore<AppLanguageState> {
  constructor() {
    super(appLanguageInitialState);
    const activeLangStorage = localStorage.getItem(LocalStorageKey.ACTIVE_LANG);
    if (activeLangStorage && SupportedLanguage[activeLangStorage]) {
      this.setState({ language: activeLangStorage });
    }
  }

  readonly changeLanguage = this.updater(
    (state, language: SupportedLanguage) => {
      localStorage.setItem(LocalStorageKey.ACTIVE_LANG, language as string);
      return { ...state, language: language };
    }
  );

  readonly language$: Observable<SupportedLanguage> = this.select(
    state => state.language
  );
}
