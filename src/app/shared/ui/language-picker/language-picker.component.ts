import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SupportedLanguage } from '../../data-access/constants/supported-language';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'cv-mate-language-picker',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, TranslocoModule],
  template: `
    <mat-form-field subscriptSizing="dynamic">
      <mat-select
        [(ngModel)]="value"
        panelClass="flag-option"
        [placeholder]="'language.inputPlaceholder' | transloco"
        (ngModelChange)="changeLanguage($event)">
        <mat-select-trigger>
          <div *ngIf="value">
            <span class="fi fi-{{ supportedLanguage[value].code }}"></span>
            {{ supportedLanguage[value].nameKey | transloco | titlecase }}
          </div>
        </mat-select-trigger>
        <mat-option value="{{ language }}" *ngFor="let language of keys">
          <div>
            <span class="fi fi-{{ supportedLanguage[language].code }}"></span>
            {{ supportedLanguage[language].nameKey | transloco | titlecase }}
          </div>
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['language-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LanguagePickerComponent,
    },
  ],
})
export class LanguagePickerComponent implements ControlValueAccessor {
  protected readonly supportedLanguage = SupportedLanguage;
  protected readonly keys = Object.keys(this.supportedLanguage);

  value!: SupportedLanguage;
  onChange!: (value: SupportedLanguage) => void;
  onTouched!: () => void;

  changeLanguage(value: SupportedLanguage) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: (value: SupportedLanguage) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(language: SupportedLanguage): void {
    this.value = language;
  }
}
