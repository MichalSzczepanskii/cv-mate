import { MockBuilder, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { findDirective } from './spec-utils/elements';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(() => {
    return MockBuilder(AppComponent, AppModule).replace(
      RouterModule,
      RouterTestingModule
    );
  });

  it('should create', () => {
    const fixture = MockRender(AppComponent);
    expect(fixture).toBeDefined();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render navbar component', () => {
    const fixture = MockRender(AppComponent);
    const navbarComponent = findDirective(fixture, NavbarComponent);
    expect(navbarComponent).toBeTruthy();
  });
});
