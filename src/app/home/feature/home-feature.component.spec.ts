import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeatureComponent } from './home-feature.component';

describe('HomeFeatureComponent', () => {
  let component: HomeFeatureComponent;
  let fixture: ComponentFixture<HomeFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFeatureComponent],
    });
    fixture = TestBed.createComponent(HomeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
