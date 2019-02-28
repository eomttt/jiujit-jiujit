import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score-button',
  templateUrl: './score-button.component.html',
  styleUrls: ['./score-button.component.scss'],
})
export class ScoreButtonComponent implements OnInit {

  _scoreText: any;

  @Input()
  set scoreText(data) {
    this._scoreText = data;
  }
  get scoreText() {
    return this._scoreText;
  }


  constructor() { }

  ngOnInit() {}

}
