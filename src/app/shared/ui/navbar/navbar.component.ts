import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'cv-mate-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span
        ><img
          data-testId="logo"
          src="assets/images/logo-no-background.svg"
          alt="CVMate"
          class="logo"
      /></span>
    </mat-toolbar>
  `,
  styles: [],
})
export class NavbarComponent {}
