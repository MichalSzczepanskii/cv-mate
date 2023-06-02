import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeFeatureRoutingModule } from './home-feature-routing.module';
import { HomeFeatureComponent } from './home-feature.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [HomeFeatureComponent],
  imports: [
    CommonModule,
    HomeFeatureRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class HomeFeatureModule {}
