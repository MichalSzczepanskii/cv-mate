import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { SupportedLanguage } from '../../data-access/constants/supported-language';

@Component({
  selector: 'cv-mate-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, LanguagePickerComponent],
  template: `
    <mat-toolbar color="primary">
      <span
        ><img
          data-testId="logo"
          src="assets/images/logo-no-background.svg"
          alt="CVMate"
          class="logo"
      /></span>
      <span class="spacer"></span>
      <cv-mate-language-picker
        [selectedLanguage]="language"></cv-mate-language-picker>
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
  @Input({ required: true })
  language!: SupportedLanguage;
}
