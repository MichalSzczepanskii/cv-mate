import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { findDirective } from './spec-utils/elements';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { TranslocoService } from '@ngneat/transloco';

describe('AppComponent', () => {
  let fixture: MockedComponentFixture<AppComponent>;
  let component: AppComponent;
  let translocoService: TranslocoService;

  beforeEach(() => {
    return MockBuilder(AppComponent, AppModule)
      .replace(RouterModule, RouterTestingModule)
      .keep(NavbarComponent);
  });

  beforeEach(() => {
    fixture = MockRender(AppComponent, null, false);
    component = fixture.point.componentInstance;
    translocoService = fixture.point.injector.get(TranslocoService);

    jest.spyOn(translocoService, 'getDefaultLang').mockReturnValue('pl');
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

  it('should pass language to navbar component', () => {
    fixture.detectChanges();
    const navbarComponent = findDirective(fixture, NavbarComponent);
    expect(navbarComponent.componentInstance.language).toEqual('POLISH');
  });

  it('should pass english as default language to navbar component if code given by transloco service is not supported', () => {
    jest.spyOn(translocoService, 'getDefaultLang').mockReturnValue('es');
    fixture.detectChanges();
    const navbarComponent = findDirective(fixture, NavbarComponent);
    expect(navbarComponent.componentInstance.language).toEqual('ENGLISH');
  });
});
