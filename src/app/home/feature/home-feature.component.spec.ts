import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeatureComponent } from './home-feature.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockProvider } from 'ng-mocks';
import { ResumeStore } from '../../shared/data-access/stores/resume/resume.store';
import { of } from 'rxjs';
import { ResumeItemComponent } from '../ui/resume-item/resume-item.component';
import { By } from '@angular/platform-browser';
import { Resume } from '../../shared/data-access/models/resume';

describe('HomeFeatureComponent', () => {
  let component: HomeFeatureComponent;
  let fixture: ComponentFixture<HomeFeatureComponent>;
  let resumeStore: ResumeStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFeatureComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        ResumeItemComponent,
      ],
      providers: [
        MockProvider(ResumeStore, {
          resumes$: of([]),
        }),
      ],
    });
    fixture = TestBed.createComponent(HomeFeatureComponent);
    component = fixture.componentInstance;
    resumeStore = TestBed.inject(ResumeStore);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render resumes in list', () => {
    const resumes: Resume[] = [
      { id: '1', name: 'test', language: 'POLISH', data: {} },
      { id: '2', name: 'test 2', language: 'ENGLISH', data: {} },
    ];
    jest.spyOn(resumeStore, 'resumes$', 'get').mockReturnValue(of(resumes));
    fixture.detectChanges();
    const resumesList = fixture.debugElement.queryAll(
      By.directive(ResumeItemComponent)
    );
    expect(resumesList.length).toEqual(resumes.length);
    resumesList.forEach(resume => {
      expect(resumes).toContain(resume.componentInstance.resume);
    });
  });
});
