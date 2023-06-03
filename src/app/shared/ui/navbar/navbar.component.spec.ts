import { NavbarComponent } from './navbar.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { findDirective, findElStrict } from '../../../spec-utils/elements';

describe('NavbarComponent', () => {
  beforeEach(() => {
    return MockBuilder(NavbarComponent).keep(MatTooltipModule);
  });

  it('should create', () => {
    const fixture = MockRender(NavbarComponent);
    expect(fixture).toBeDefined();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render toolbar with primary color', () => {
    const fixture = MockRender(NavbarComponent);
    const toolbarComponent = findDirective(fixture, MatToolbar);
    expect(toolbarComponent).toBeTruthy();
    expect(toolbarComponent.attributes['color']).toEqual('primary');
  });

  it('should render logo image with alt name of app name', () => {
    const fixture = MockRender(NavbarComponent);
    const image = findElStrict(fixture, 'logo');
    expect(image.attributes['src']).toEqual(
      'assets/images/logo-no-background.svg'
    );
    expect(image.attributes['alt']).toEqual('CVMate');
  });
});
