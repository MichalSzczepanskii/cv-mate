import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { findDirective } from './spec-utils/elements';
import { NavbarComponent } from './navbar/feature/navbar.component';
import { AppLanguageFormComponent } from './navbar/ui/app-language-form/app-language-form.component';

describe('AppComponent', () => {
  let fixture: MockedComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    return MockBuilder(AppComponent, AppModule)
      .replace(RouterModule, RouterTestingModule)
      .keep(NavbarComponent);
  });

  beforeEach(() => {
    fixture = MockRender(AppComponent, null, false);
    component = fixture.point.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render navbar component', () => {
    fixture.detectChanges();
    const navbarComponent = findDirective(fixture, NavbarComponent);
    expect(navbarComponent).toBeTruthy();
  });

  it('should render app language form component', () => {
    fixture.detectChanges();
    const appLanguageForm = findDirective(fixture, AppLanguageFormComponent);
    expect(appLanguageForm).toBeTruthy();
  });
});
