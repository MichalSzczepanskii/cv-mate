import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguagePickerComponent } from '../../shared/ui/language-picker/language-picker.component';
import { SupportedLanguage } from '../../shared/data-access/constants/supported-language';
import { AppLanguageStore } from '../../shared/data-access/stores/app-language/app-language.store';
import { AppLanguageFormComponent } from '../ui/app-language-form/app-language-form.component';

@Component({
  selector: 'cv-mate-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    LanguagePickerComponent,
    AppLanguageFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppLanguageStore],
  template: `
    <mat-toolbar color="primary">
      <span
        ><img
          data-testId="logo"
          src="../../../assets/images/logo-no-background.svg"
          alt="CVMate"
          class="logo"
      /></span>
      <span class="spacer"></span>
      <ng-container *ngIf="language$ | async as language">
        <cv-mate-app-language-form
          [language]="language"
          (changeLanguage)="
            onLanguageChange($event)
          "></cv-mate-app-language-form>
      </ng-container>
    </mat-toolbar>
  `,
  styles: [
    `
      .logo {
        width: 10rem;
        height: auto;
      }
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class NavbarComponent {
  private appLangStore = inject(AppLanguageStore);
  language$ = this.appLangStore.language$;

  onLanguageChange(language: SupportedLanguage) {
    this.appLangStore.changeLanguage(language);
  }
}
