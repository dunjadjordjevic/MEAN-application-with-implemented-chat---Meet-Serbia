import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseForMeComponent } from './choose-for-me.component';

describe('ChooseForMeComponent', () => {
  let component: ChooseForMeComponent;
  let fixture: ComponentFixture<ChooseForMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseForMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseForMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
