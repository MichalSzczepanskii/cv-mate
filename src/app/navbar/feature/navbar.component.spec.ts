import { NavbarComponent } from './navbar.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { findDirective, findElStrict } from '../../spec-utils/elements';
import { LanguagePickerComponent } from '../../shared/ui/language-picker/language-picker.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLanguageStore } from '../../shared/data-access/stores/app-language/app-language.store';
import { AppLanguageFormComponent } from '../ui/app-language-form/app-language-form.component';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let fixture: MockedComponentFixture<NavbarComponent, { language: string }>;
  let component: NavbarComponent;
  let appLanguageStore: AppLanguageStore;

  beforeEach(() => {
    return MockBuilder(NavbarComponent)
      .keep(CommonModule)
      .keep(MatTooltipModule)
      .keep(LanguagePickerComponent)
      .keep(BrowserAnimationsModule.withConfig({ disableAnimations: true }))
      .mock(AppLanguageStore, {
        language$: of('ENGLISH'),
        changeLanguage: jest.fn(),
      });
  });

  beforeEach(() => {
    fixture = MockRender(NavbarComponent, { language: 'ENGLISH' }, false);
    component = fixture.point.componentInstance;
    appLanguageStore = fixture.point.injector.get(AppLanguageStore);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render toolbar with primary color', () => {
    fixture.detectChanges();
    const toolbarComponent = findDirective(fixture, MatToolbar);
    expect(toolbarComponent).toBeTruthy();
    expect(toolbarComponent.attributes['color']).toEqual('primary');
  });

  it('should render logo image with alt name of app name', () => {
    fixture.detectChanges();
    const image = findElStrict(fixture, 'logo');
    expect(image.attributes['src']).toEqual(
      'assets/images/logo-no-background.svg'
    );
    expect(image.attributes['alt']).toEqual('CVMate');
  });

  it('should render language-picker and pass input to it', () => {
    const passedLanguage = 'ENGLISH';
    fixture.detectChanges();
    const appLanguageForm = findDirective(fixture, AppLanguageFormComponent);
    expect(appLanguageForm).toBeTruthy();
    expect(appLanguageForm.componentInstance.language).toEqual(passedLanguage);
  });

  it('should emit changeLanguage on newLanguage event from LanguagePickerComponent', () => {
    jest.spyOn(appLanguageStore, 'changeLanguage');
    fixture.detectChanges();
    const appLangForm = findDirective(fixture, AppLanguageFormComponent);
    appLangForm.triggerEventHandler('changeLanguage', 'POLISH');
    expect(appLanguageStore.changeLanguage).toHaveBeenCalledWith('POLISH');
  });
});
