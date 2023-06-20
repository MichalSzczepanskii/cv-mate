import { LanguagePickerComponent } from './language-picker.component';
import { MatSelectHarness } from '@angular/material/select/testing';
import { titleCaseTransformer } from '../../../spec-utils/title-case-transformer';
import { HarnessLoader } from '@angular/cdk/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SupportedLanguage } from '../../data-access/constants/supported-language';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { getTranslocoModule } from '../../../spec-utils/transloco-testing.module';

describe('LanguagePickerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;
  let languagePickerComponent: LanguagePickerComponent;
  let loader: HarnessLoader;

  const supportedLanguages = ['ENGLISH', 'POLISH'];

  @Component({
    template: `<form [formGroup]="form">
      <cv-mate-language-picker
        formControlName="control"></cv-mate-language-picker>
    </form>`,
  })
  class HostComponent {
    public control = new FormControl<SupportedLanguage>('');
    public form = new FormGroup({ control: this.control });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LanguagePickerComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule.withConfig({ disableAnimations: true }),
        getTranslocoModule(),
      ],
      declarations: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    languagePickerComponent = fixture.debugElement.query(
      By.directive(LanguagePickerComponent)
    ).componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('form control without initial value', () => {
    it('should display language options', async () => {
      fixture.detectChanges();
      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await Promise.all(
        (await select.getOptions()).map(el => el.getText())
      );
      expect(options.sort()).toEqual(
        supportedLanguages.map(el => titleCaseTransformer(el)).sort()
      );
    });

    it('should set value to changed language', async () => {
      fixture.detectChanges();
      const select = await loader.getHarness(MatSelectHarness);
      await select.clickOptions({
        text: titleCaseTransformer(supportedLanguages[1]),
      });
      expect(hostComponent.form.get('control')?.value).toEqual(
        supportedLanguages[1]
      );
    });

    it('should display a placeholder', async () => {
      fixture.detectChanges();
      const select = await loader.getHarness(MatSelectHarness);
      const selectedOption = await select.getValueText();
      expect(selectedOption).toEqual('Select a language');
    });
  });

  describe('form control with initial value', () => {
    beforeEach(() => {
      const control = new FormControl<SupportedLanguage>(supportedLanguages[1]);
      hostComponent.form = new FormGroup({ control });
    });

    it('should set passed language as initial value', () => {
      fixture.detectChanges();
      expect(languagePickerComponent.value).toEqual(supportedLanguages[1]);
    });

    it('should display language', async () => {
      fixture.detectChanges();
      const select = await loader.getHarness(MatSelectHarness);
      const selectedOption = await select.getValueText();
      expect(selectedOption).toEqual('Polish');
    });
  });
});
