import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {

  INTERVAL_TIME = 1000;

  // start, pause, stop
  _mode: any;
  _roundInfo: any;

  @Input()
  set mode(data) {
    this._mode = data;
  }
  get mode() {
    return this._mode;
  }

  @Input()
  set roundInfo(data) {
    this._roundInfo = data;
  }
  get roundInfo() {
    return this._roundInfo;
  }

  @Output()
  timeout = new EventEmitter();

  ngInit = false;

  time = null;

  viewTimer = null;
  viewTime = null;

  constructor(private nativeAudioPlgn: NativeAudio,
              private vibrationPlgn: Vibration) { }

  ngOnChanges(changes) {
    console.log('Timer changes', changes.roundInfo);
    if (this.ngInit) {
      if (!!changes.roundInfo) {
        this._calculateViewTime();
      }
      this._controlTime();
    }
  }

  ngOnInit() {
    this.ngInit = true;
    this._initTime();

    this._setAlarmFile();
  }

  private _setAlarmFile() {
    this.nativeAudioPlgn.preloadSimple('longBeep', 'assets/file/long_beep.mp3');
    this.nativeAudioPlgn.preloadSimple('shortBeep', 'assets/file/short_beep.mp3');
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

    if (this.time < 0) {
      this._timeoutTimer();
      return;
    } else if (this.time === 0) {
      this._playLongAlarm();
    } else if (this.time < 4) {
      this._playShortAlarm();
    }
  }

  private _playLongAlarm() {
    this.nativeAudioPlgn.play('longBeep');
    this.vibrationPlgn.vibrate(1000);
  }

  private _playShortAlarm() {
    this.nativeAudioPlgn.play('shortBeep');
    this.vibrationPlgn.vibrate(500);
  }

  private _timeoutTimer() {
    this.timeout.emit();
  }

  private _startTimer() {
    if (!!!this.viewTimer) {
      this.viewTimer = setInterval(() => {
        this._checkTimeout();
      }, this.INTERVAL_TIME);
    } else {
      console.log('Timer is already exist');
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
    } else {
      console.log('Timer is already canceled');
    }
  }

  private _initTime() {
    console.log('Init time', this.roundInfo);
    if (!!this.roundInfo) {
      this._calculateViewTime();
    }
  }

  private _calculateViewTime() {
    this.time = parseInt(this.roundInfo.min) * 60 + parseInt(this.roundInfo.sec);

    this._setViewTime();
  }

}
