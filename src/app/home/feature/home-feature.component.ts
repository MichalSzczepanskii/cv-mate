import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeStore } from '../../shared/data-access/stores/resume/resume.store';

@Component({
  selector: 'cv-mate-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeatureComponent {
  private resumeStore = inject(ResumeStore);
  resumes$ = this.resumeStore.resumes$;
}
