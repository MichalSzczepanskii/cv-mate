import { SupportedLanguage } from '../../constants/supported-language';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { LocalStorageKey } from '../../constants/local-storage-key';
import { Observable } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

export interface AppLanguageState {
  language: SupportedLanguage;
}

export const appLanguageInitialState: AppLanguageState = {
  language: Object.keys(SupportedLanguage)[0],
};

@Injectable()
export class AppLanguageStore extends ComponentStore<AppLanguageState> {
  constructor(private translocoService: TranslocoService) {
    super(appLanguageInitialState);
    this.setInitialState();
  }

  private setInitialState() {
    const activeLangStorage = localStorage.getItem(LocalStorageKey.ACTIVE_LANG);
    if (activeLangStorage && SupportedLanguage[activeLangStorage]) {
      this.setActiveLangState(activeLangStorage);
    } else {
      const activeLang = this.getActiveLang();
      this.setActiveLangState(activeLang);
    }
  }

  private getActiveLang() {
    const activeLangCode = this.translocoService.getActiveLang();
    const supportedLanguageKeys = Object.keys(SupportedLanguage);
    const currentLanguageKey = supportedLanguageKeys.find(
      key => SupportedLanguage[key].translocoCode === activeLangCode
    );
    return currentLanguageKey ?? supportedLanguageKeys[0];
  }

  private setActiveLangState(activeLang: SupportedLanguage) {
    this.setState({ language: activeLang });
    this.setActiveState(activeLang);
  }

  private setActiveState(activeLang: SupportedLanguage) {
    this.translocoService.setActiveLang(
      SupportedLanguage[activeLang].translocoCode
    );
  }

  readonly changeLanguage = this.updater(
    (state, language: SupportedLanguage) => {
      localStorage.setItem(LocalStorageKey.ACTIVE_LANG, language as string);
      this.setActiveState(language);
      return { ...state, language: language };
    }
  );

  readonly language$: Observable<SupportedLanguage> = this.select(
    state => state.language
  );
}
