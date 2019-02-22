import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreButtonPage } from './score-button.page';

describe('ScoreButtonPage', () => {
  let component: ScoreButtonPage;
  let fixture: ComponentFixture<ScoreButtonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreButtonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreButtonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
