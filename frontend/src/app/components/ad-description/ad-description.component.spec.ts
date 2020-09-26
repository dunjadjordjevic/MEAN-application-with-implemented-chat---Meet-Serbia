import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDescriptionComponent } from './ad-description.component';

describe('AdDescriptionComponent', () => {
  let component: AdDescriptionComponent;
  let fixture: ComponentFixture<AdDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
