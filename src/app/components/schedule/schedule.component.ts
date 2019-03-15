import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  _round: any;
  _index: any;

  @Input()
  set round(data) {
    this._round = data;
  }
  get round() {
    return this._round;
  }

  @Input()
  set index(data) {
    this._index = data;
  }
  get index() {
    return this._index;
  }

  @Output()
  remove = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }

  public setBackgroundColor() {
    if (this.index % 2 === 0) {
      return {'background-color': 'green'};
    } else {
      return {'background-color': 'yellow'};
    }
  }

  public setTimeText(time) {
    let min: any = time.min,
        sec: any = time.sec;

    if (min < 10) {
      min = '0' + min;
    }

    if (sec < 10) {
      sec = '0' + sec;
    }

    return min + 'min ' + sec + 'sec';
  }

  public removeRound() {
    this.remove.emit(this.index);
  }

}
