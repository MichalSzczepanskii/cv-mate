import { ResumeItemComponent } from './resume-item.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { CommonModule } from '@angular/common';
import { Resume } from '../../../shared/data-access/models/resume';
import { MatIconModule } from '@angular/material/icon';
import { findElStrict } from '../../../spec-utils/elements';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SupportedLanguage } from '../../../shared/data-access/constants/supported-language';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getTranslocoModule } from '../../../spec-utils/transloco-testing.module';
import { TranslocoModule } from '@ngneat/transloco';

describe('ResumeItemComponent', () => {
  let component: ResumeItemComponent;
  let fixture: MockedComponentFixture<ResumeItemComponent, { resume: Resume }>;
  let loader: HarnessLoader;

  const resume: Resume = {
    id: '1',
    name: 'test',
    language: 'POLISH',
    data: {},
  };

  beforeEach(() => {
    return MockBuilder(ResumeItemComponent)
      .keep(CommonModule)
      .keep(MatIconModule)
      .keep(MatMenuModule)
      .keep(BrowserAnimationsModule.withConfig({ disableAnimations: true }))
      .keep(getTranslocoModule())
      .keep(TranslocoModule);
  });

  beforeEach(() => {
    fixture = MockRender(ResumeItemComponent, { resume }, false);
    component = fixture.point.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display resume as list item', async () => {
    fixture.detectChanges();
    const name = findElStrict(fixture, 'resumeName');
    const flag = findElStrict(fixture, 'resumeFlag');

    expect(name.nativeElement.textContent).toEqual(resume.name);
    expect(Object.keys(flag.classes)).toEqual([
      'fi',
      `fi-${SupportedLanguage[resume.language].code}`,
    ]);
  });

  it('should have menu with options for resume', async () => {
    fixture.detectChanges();
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    const options = await Promise.all(
      (await menu.getItems()).map(item => item.getText())
    );
    expect(options).toEqual([
      'editEdit',
      'deleteDelete',
      'content_copyDuplicate',
      'downloadExport',
      'picture_as_pdfDownload as PDF',
    ]);
  });
});
