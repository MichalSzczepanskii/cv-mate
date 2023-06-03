import { NavbarComponent } from './navbar.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { findDirective, findElStrict } from '../../../spec-utils/elements';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavbarComponent', () => {
  let fixture: MockedComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

  beforeEach(() => {
    return MockBuilder(NavbarComponent)
      .keep(CommonModule)
      .keep(MatTooltipModule)
      .keep(LanguagePickerComponent)
      .keep(BrowserAnimationsModule.withConfig({ disableAnimations: true }));
  });

  beforeEach(() => {
    fixture = MockRender(NavbarComponent, { language: 'ENGLISH' }, false);
    component = fixture.point.componentInstance;
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
    fixture.detectChanges();
    const languagePickerComponent = findDirective(
      fixture,
      LanguagePickerComponent
    );
    expect(languagePickerComponent).toBeTruthy();
    expect(languagePickerComponent.componentInstance.value).toEqual('ENGLISH');
  });
});
