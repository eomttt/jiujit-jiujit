import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  TIMER_BUTTON_TEXT = {
    START: 'START',
    PAUSE: 'PAUSE',
    STOP: 'STOP'
  };

  timerMode = null;

  constructor() { }

  ngOnInit() {
  }

  public startTimer() {
    this.timerMode = 'start';
  }

  public stopTimer() {
    this.timerMode = 'stop';
  }

  public pauseTimer() {
    this.timerMode = 'pause';
  }

}
