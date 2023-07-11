import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resume } from '../../../shared/data-access/models/resume';
import { SupportedLanguage } from '../../../shared/data-access/constants/supported-language';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cv-mate-resume-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    TranslocoModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cv">
      <div data-testId="resumeName">{{ resume.name }}</div>
      <div class="menu">
        <div>
          <span
            [ngClass]="['fi', 'fi-' + SupportedLanguage[resume.language].code]"
            data-testId="resumeFlag"></span>
        </div>
        <button
          mat-icon-button
          [matMenuTriggerFor]="menu"
          aria-label="Example icon-button with a menu">
          <mat-icon>more_vert</mat-icon>
        </button>
      </div>
    </div>

    <mat-menu #menu="matMenu">
      <button mat-menu-item>
        <mat-icon>edit</mat-icon>
        <span>{{ 'cvMenu.edit' | transloco }}</span>
      </button>
      <button mat-menu-item>
        <mat-icon>delete</mat-icon>
        <span>{{ 'cvMenu.delete' | transloco }}</span>
      </button>
      <button mat-menu-item>
        <mat-icon>content_copy</mat-icon>
        <span>{{ 'cvMenu.copy' | transloco }}</span>
      </button>
      <button mat-menu-item>
        <mat-icon>download</mat-icon>
        <span>{{ 'cvMenu.export' | transloco }}</span>
      </button>
      <button mat-menu-item>
        <mat-icon>picture_as_pdf</mat-icon>
        <span>{{ 'cvMenu.downloadPDF' | transloco }}</span>
      </button>
    </mat-menu>
  `,
  styleUrls: ['./resume-item.component.scss'],
})
export class ResumeItemComponent {
  @Input({ required: true })
  resume!: Resume;
  protected readonly SupportedLanguage = SupportedLanguage;
}
