import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeFeatureRoutingModule } from './home-feature-routing.module';
import { HomeFeatureComponent } from './home-feature.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { ResumeItemComponent } from '../ui/resume-item/resume-item.component';
import { ResumeStore } from '../../shared/data-access/stores/resume/resume.store';

@NgModule({
  declarations: [HomeFeatureComponent],
  imports: [
    CommonModule,
    HomeFeatureRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslocoModule,
    ResumeItemComponent,
  ],
  providers: [ResumeStore],
})
export class HomeFeatureModule {}
