import { LanguagePickerComponent } from './language-picker.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { titleCaseTransformer } from '../../../spec-utils/title-case-transformer';
import { HarnessLoader } from '@angular/cdk/testing';
import { FormsModule } from '@angular/forms';

describe('LanguagePickerComponent', () => {
  let fixture: MockedComponentFixture<
    LanguagePickerComponent,
    { selectedLanguage: string }
  >;
  let component: LanguagePickerComponent;
  let loader: HarnessLoader;

  const supportedLanguages = ['ENGLISH', 'POLISH'];

  beforeEach(() => {
    return MockBuilder(LanguagePickerComponent)
      .keep(CommonModule)
      .keep(MatSelectModule)
      .keep(FormsModule)
      .provide(TitleCasePipe)
      .keep(BrowserAnimationsModule.withConfig({ disableAnimations: true }));
  });

  beforeEach(() => {
    fixture = MockRender(
      LanguagePickerComponent,
      {
        selectedLanguage: 'ENGLISH',
      },
      false
    );
    component = fixture.point.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display language options', async () => {
    fixture.componentInstance.selectedLanguage = supportedLanguages[0];
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

  it('should select language passed in input', async () => {
    const selectedLanguage = 'POLISH';
    fixture.componentInstance.selectedLanguage = selectedLanguage;
    fixture.detectChanges();

    const select = await loader.getHarness(MatSelectHarness);
    const selectedOption = await select.getValueText();
    expect(selectedOption).toEqual(titleCaseTransformer(selectedLanguage));
  });

  it('should set value to changed language', async () => {
    fixture.componentInstance.selectedLanguage = supportedLanguages[0];
    fixture.detectChanges();

    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({
      text: titleCaseTransformer(supportedLanguages[1]),
    });
    expect(fixture.point.componentInstance.value).toEqual(
      supportedLanguages[1]
    );
  });

  it('should emit selectedLanguage on change', async () => {
    jest.spyOn(component.newLanguage, 'emit');
    fixture.componentInstance.selectedLanguage = supportedLanguages[0];
    fixture.detectChanges();

    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({
      text: titleCaseTransformer(supportedLanguages[1]),
    });

    expect(component.newLanguage.emit).toHaveBeenCalledWith(
      supportedLanguages[1]
    );
  });
});
