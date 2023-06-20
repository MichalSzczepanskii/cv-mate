import { AppLanguageFormComponent } from './app-language-form.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { SupportedLanguage } from '../../../shared/data-access/constants/supported-language';
import { LanguagePickerComponent } from '../../../shared/ui/language-picker/language-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getTranslocoModule } from '../../../spec-utils/transloco-testing.module';

describe('AppLanguageFormComponent', () => {
  let component: AppLanguageFormComponent;
  let fixture: MockedComponentFixture<
    AppLanguageFormComponent,
    { language: SupportedLanguage }
  >;
  let loader: HarnessLoader;

  const supportedLanguages = Object.keys(SupportedLanguage);

  beforeEach(() => {
    return MockBuilder(AppLanguageFormComponent)
      .keep(FormBuilder)
      .keep(ReactiveFormsModule)
      .keep(CommonModule)
      .keep(LanguagePickerComponent)
      .keep(getTranslocoModule())
      .keep(BrowserAnimationsModule.withConfig({ disableAnimations: true }));
  });

  beforeEach(() => {
    fixture = MockRender(AppLanguageFormComponent, null, false);
    component = fixture.point.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should trigger event emitter with value on form value change', async () => {
    jest.spyOn(component.changeLanguage, 'emit');
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    await select.clickOptions({ text: 'Polish' });
    expect(component.changeLanguage.emit).toHaveBeenCalledWith(
      supportedLanguages[1]
    );
  });

  it('should set language default value when passed as component input', async () => {
    fixture.componentInstance.language = supportedLanguages[1];
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    const selectedOption = await select.getValueText();
    expect(selectedOption).toEqual('Polish');
    expect(component.form.value).toEqual({
      language: supportedLanguages[1],
    });
  });
});
