import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { findDirective } from './spec-utils/elements';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { TranslocoService } from '@ngneat/transloco';
import { LocalStorageKey } from './shared/data-access/constants/local-storage-key';

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
    component.defaultLanguage = 'POLISH';
    fixture.detectChanges();
    const navbarComponent = findDirective(fixture, NavbarComponent);
    expect(navbarComponent.componentInstance.language).toEqual('POLISH');
  });

  it('should pass english as default language to navbar component if code given by transloco service is not supported', () => {
    jest.spyOn(translocoService, 'getActiveLang').mockReturnValue('es');
    fixture.detectChanges();
    const navbarComponent = findDirective(fixture, NavbarComponent);
    expect(navbarComponent.componentInstance.language).toEqual('ENGLISH');
  });

  it('should call translocoService.setDefault with language emited from navbar', () => {
    jest.spyOn(translocoService, 'setActiveLang');
    fixture.detectChanges();
    const navbarComponent = findDirective(fixture, NavbarComponent);
    navbarComponent.triggerEventHandler('changeLanguage', 'ENGLISH');
    expect(translocoService.setActiveLang).toHaveBeenCalledWith('en');
  });

  it('should save the emitted language from navbar to localStorage', () => {
    const storageSpy = jest.spyOn(Storage.prototype, 'setItem');
    fixture.detectChanges();
    const navbarComponent = findDirective(fixture, NavbarComponent);
    navbarComponent.triggerEventHandler('changeLanguage', 'POLISH');
    expect(storageSpy).toHaveBeenCalledWith(
      LocalStorageKey.ACTIVE_LANG,
      'POLISH'
    );
  });

  describe('Active Language from localStorage', () => {
    beforeEach(() => {
      jest.spyOn(translocoService, 'setActiveLang');
      jest.spyOn(translocoService, 'getActiveLang');
    });

    it('should get active language from localStorage if present', () => {
      const storageSpy = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue('POLISH');
      fixture.detectChanges();
      expect(storageSpy).toHaveBeenCalledWith(LocalStorageKey.ACTIVE_LANG);
      expect(translocoService.setActiveLang).toHaveBeenCalledWith('pl');
      expect(translocoService.getActiveLang).not.toHaveBeenCalledWith();
    });

    it('should get active language from transloco if active lang saved in local storage is null', () => {
      const storageSpy = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue(null);
      fixture.detectChanges();
      expect(storageSpy).toHaveBeenCalledWith(LocalStorageKey.ACTIVE_LANG);
      expect(translocoService.setActiveLang).not.toHaveBeenCalled();
      expect(translocoService.getActiveLang).toHaveBeenCalledWith();
    });

    it('should get active language from transloco if active lang saved in local storage is not supported', () => {
      const storageSpy = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue('TEST');
      fixture.detectChanges();
      expect(storageSpy).toHaveBeenCalledWith(LocalStorageKey.ACTIVE_LANG);
      expect(translocoService.setActiveLang).not.toHaveBeenCalled();
      expect(translocoService.getActiveLang).toHaveBeenCalledWith();
    });
  });
});
