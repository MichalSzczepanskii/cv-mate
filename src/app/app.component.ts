import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { SupportedLanguage } from './shared/data-access/constants/supported-language';

@Component({
  selector: 'cv-mate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  defaultLanguage!: SupportedLanguage;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit() {
    const defaultLangCode = this.translocoService.getActiveLang();
    const supportedLanguageKeys = Object.keys(SupportedLanguage);
    const currentLanguageKey = supportedLanguageKeys.find(
      key => SupportedLanguage[key].translocoCode === defaultLangCode
    );
    this.defaultLanguage = currentLanguageKey ?? supportedLanguageKeys[0];
  }

  changeLanguage(languageKey: SupportedLanguage) {
    const language = SupportedLanguage[languageKey];
    this.translocoService.setActiveLang(language.translocoCode);
  }
}
