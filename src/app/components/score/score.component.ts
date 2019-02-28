import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {

  _score: any;

  @Input()
  set score(data) {
    this._score = data;
  }
  get score() {
    return this._score;
  }

  constructor() { }

  ngOnInit() {}

}
