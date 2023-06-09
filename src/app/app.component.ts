import { Component, inject, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { SupportedLanguage } from './shared/data-access/constants/supported-language';
import { LocalStorageKey } from './shared/data-access/constants/local-storage-key';

@Component({
  selector: 'cv-mate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private translocoService = inject(TranslocoService);

  defaultLanguage!: SupportedLanguage;

  ngOnInit() {
    const activeLangStorage = localStorage.getItem(LocalStorageKey.ACTIVE_LANG);
    if (activeLangStorage && SupportedLanguage[activeLangStorage]) {
      this.setActiveLang(activeLangStorage);
      this.defaultLanguage = activeLangStorage;
    } else {
      const activeLangCode = this.translocoService.getActiveLang();
      const supportedLanguageKeys = Object.keys(SupportedLanguage);
      const currentLanguageKey = supportedLanguageKeys.find(
        key => SupportedLanguage[key].translocoCode === activeLangCode
      );
      this.defaultLanguage = currentLanguageKey ?? supportedLanguageKeys[0];
    }
  }

  changeLanguage(languageKey: SupportedLanguage) {
    this.setActiveLang(languageKey);
    localStorage.setItem(LocalStorageKey.ACTIVE_LANG, languageKey as string);
  }

  private setActiveLang(languageKey: SupportedLanguage) {
    const language = SupportedLanguage[languageKey];
    this.translocoService.setActiveLang(language.translocoCode);
  }
}
