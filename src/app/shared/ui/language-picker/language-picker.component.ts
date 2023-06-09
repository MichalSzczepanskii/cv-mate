import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SupportedLanguage } from '../../data-access/constants/supported-language';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cv-mate-language-picker',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule],
  template: `
    <mat-form-field subscriptSizing="dynamic">
      <mat-select
        [(ngModel)]="value"
        panelClass="flag-option"
        (ngModelChange)="changeLanguage($event)">
        <mat-select-trigger>
          <div>
            <span class="fi fi-{{ supportedLanguage[value].code }}"></span>
            {{ value | titlecase }}
          </div>
        </mat-select-trigger>
        <mat-option value="{{ language }}" *ngFor="let language of keys">
          <div>
            <span class="fi fi-{{ supportedLanguage[language].code }}"></span>
            {{ language | titlecase }}
          </div>
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['language-picker.component.scss'],
})
export class LanguagePickerComponent {
  protected readonly supportedLanguage = SupportedLanguage;
  protected readonly keys = Object.keys(this.supportedLanguage);
  @Input({ required: true })
  set selectedLanguage(value: SupportedLanguage) {
    this.value = value as string;
  }
  @Output()
  newLanguage: EventEmitter<SupportedLanguage> =
    new EventEmitter<SupportedLanguage>();

  value = this.keys[0];

  changeLanguage(value: SupportedLanguage) {
    this.newLanguage.emit(value);
  }
}
