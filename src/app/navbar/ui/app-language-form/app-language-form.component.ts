import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SupportedLanguage } from '../../../shared/data-access/constants/supported-language';
import { LanguagePickerComponent } from '../../../shared/ui/language-picker/language-picker.component';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'cv-mate-app-language-form',
  standalone: true,
  imports: [CommonModule, LanguagePickerComponent, ReactiveFormsModule],
  template: `<form [formGroup]="form">
    <cv-mate-language-picker
      formControlName="language"></cv-mate-language-picker>
  </form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLanguageFormComponent implements OnInit {
  @Input() language!: SupportedLanguage;
  @Output()
  changeLanguage: EventEmitter<SupportedLanguage> =
    new EventEmitter<SupportedLanguage>();

  private formBuilder = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      language: [this.language ?? null],
    });
    this.listenToLangChange();
  }

  private listenToLangChange() {
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      this.changeLanguage.emit(value.language);
    });
  }
}
