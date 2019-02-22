import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDetailPage } from './score-detail.page';

describe('ScoreDetailPage', () => {
  let component: ScoreDetailPage;
  let fixture: ComponentFixture<ScoreDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
