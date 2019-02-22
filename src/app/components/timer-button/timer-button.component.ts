import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.scss'],
})
export class TimerButtonComponent implements OnInit {

  _buttonText: any;

  @Input()
  set buttonText(data) {
    this._buttonText = data;
  }
  get buttonText() {
    return this._buttonText;
  }

  constructor() { }

  ngOnInit() {}

}
