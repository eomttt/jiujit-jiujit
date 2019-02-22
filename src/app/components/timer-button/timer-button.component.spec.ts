import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerButtonPage } from './timer-button.page';

describe('TimerButtonPage', () => {
  let component: TimerButtonPage;
  let fixture: ComponentFixture<TimerButtonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerButtonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerButtonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
