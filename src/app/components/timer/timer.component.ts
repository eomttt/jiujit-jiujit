import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {

  INTERVAL_TIME = 1000;

  // start, pause, stop
  _mode: any;
  _maxTime: any;

  @Input()
  set mode(data) {
    this._mode = data;
  }
  get mode() {
    return this._mode;
  }

  @Input()
  set maxTime(data) {
    this._maxTime = data;
  }
  get maxTime() {
    return this._maxTime;
  }

  @Output()
  endTime = new EventEmitter();

  ngInit = false;

  time = null;

  viewTimer = null;
  viewTime = null;

  constructor() { }

  ngOnChanges(changes) {
    if (this.ngInit) {
      this._controlTime();
    }
  }

  ngOnInit() {
    this.ngInit = true;
    this._initTime();
  }


  /*
   * private function
   */

  private _controlTime() {
    if (this.mode === 'start') {
      this._startTimer();
    } else if (this.mode === 'pause') {
      this._pauseTimer();
    } else {
      this._stopTimer();
    }
  }

  private _setViewTime() {
    let min: any = Math.floor(this.time / 60),
        sec: any = Math.floor(this.time % 60);

    if (min < 10) {
      min = '0' + min;
    }

    if (sec < 10) {
      sec = '0' + sec;
    }

    this.viewTime = min + ':' + sec;
  }

  private _checkTimeout() {
    this.time = this.time - 1;
    this._setViewTime();

    if (this.time === 0) {
      this._timeoutTimer();
    }
  }

  private _timeoutTimer() {
    this._stopTimer();

    // TO DO: Add Alarm
  }

  private _startTimer() {
    if (!!this.viewTimer) {
      this.viewTimer = setInterval(() => {
        this._checkTimeout();
      }, this.INTERVAL_TIME);
    }
  }

  private _pauseTimer() {
    this._initTimer()
  }

  private _stopTimer() {
    this._initTimer();
    this._initTime();
  }

  private _initTimer() {
    if (!!this.viewTimer) {
      clearInterval(this.viewTimer);
      this.viewTimer = null;
    }
  }

  private _initTime() {
    this.time = parseInt(this.maxTime) * 60;

    this._setViewTime();
  }

}
