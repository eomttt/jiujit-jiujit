import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import services
import { RoundService } from '../../services/round.service';

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

  SCORE_TEXT = {
    TD: 'TakeDown',
    SP: 'Sweep',
    KB: 'KneeOnBelly',
    GP: 'GuardPass',
    TM: 'TopMount',
    BM: 'BackMount'
  };

  SUB_SCORE_TEXT = {
    AD: 'Advantage',
    PT: 'Penalty'
  };

  CANCLE_TEXT = 'Cancel';

  scoreInfo: any = {};

  roundList: any = [];
  nowRepeatCount: any = 1;
  wholeRepeatCount: any = 1;
  nowRoundInfo: any = {};
  nowRound: any = null;
  wholeRoundCount: any = 1;
  nowRoundCount: any = 1;

  activeRound = true;

  timerMode = 'stop';

  constructor(private router: Router,
              private roundSrv: RoundService) {

  }

  ngOnInit() {
    this.initScore();
  }

  ionViewWillEnter() {
    this._initRound();
  }

  public initScore() {
    this.scoreInfo.left = {
      main: 0,
      advantage: 0,
      panelty: 0,
      history: []
    }

    this.scoreInfo.right = {
      main: 0,
      advantage: 0,
      panelty: 0,
      history: []
    }
  }

  public clearSchedule() {
    this.stopTimer();

    this._clearRound();
    this._clearRepeat();
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

  public timeoutTimer() {
    this.timerMode = 'stop';

    this._setNextRound();
  }

  /**
   * [setScore description]
   * @param {[type]} side  [left or right]
   * @param {[type]} type  [main or ad(advantage) or pt(penalty)]
   * @param {[type]} score [score]
   */
  public setScore(side, type, score) {
    this.scoreInfo[side][type] = this.scoreInfo[side][type] + score;

    this.scoreInfo[side]['history'].push({
      type: type,
      score: score
    });
  }

  public cancelLastScore(side) {
    if (this.scoreInfo[side]['history'].length > 0) {
      let lastInfo = this.scoreInfo[side]['history'].pop();

      this.scoreInfo[side][lastInfo.type] = this.scoreInfo[side][lastInfo.type] - lastInfo.score;
    } else {
      // History has none
      // Do Nothing
    }
  }

  public openSettingPage() {
    this.router.navigate(['setting', {}]);
  }

  public setActiveText() {
    if (this.activeRound) {
      return 'ACTIVE';
    } else {
      return 'REST';
    }
  }

  public isExistRound() {
    return this.roundList.length > 0;
  }

  /*
   * Private function
   */

  private _clearRepeat() {
    this.roundSrv.clearRepeat();
    this.nowRepeatCount = this.roundSrv.getNowRepeatCount();
  }

  private _clearRound() {
    this.roundSrv.clearRound();
    this._initRound();
  }

  private _initRound() {
    let roundInfo = this.roundSrv.getRounds();

    this.activeRound = true;

    this.roundList = roundInfo.list;

    this.wholeRepeatCount = roundInfo.repeat;
    this.wholeRoundCount = this.roundList.length;

    if (this.isExistRound()) {
      this._setRound();
    } else {
      // Nothing
    }
  }

  private _setRound() {
    this.nowRoundInfo = null;

    this.nowRoundCount = this.roundSrv.getNowRoundCount();

    this.nowRoundInfo = this.roundList[this.nowRoundCount - 1];

    if (this.activeRound) {
      this.nowRound = this.nowRoundInfo.active;
    } else {
      this.nowRound = this.nowRoundInfo.rest;
    }
  }

  private _setNextRound() {
    if (this.activeRound) {
      if (this._isPassRestRound()) {
        // Pass
      } else {
        this.activeRound = false;
      }
    } else {
      this.activeRound = true;
    }

    if (this.activeRound) {
      this.roundSrv.setNextRound();

      if (this._isFinishWholeRound()) {
        this._clearRound();
        this.roundSrv.setNextRepeat();

        if (this._isFinishWholeRepeat()) {
          this.clearSchedule();
          return;
        }
      }
    }

    if (this.timerMode === 'stop') {
      this.initScore();
    }

    this._setRound();
    this._startNextRoundTimer();
  }

  private _isPassRestRound() {
    return this.nowRoundInfo.rest.min === 0 &&
           this.nowRoundInfo.rest.sec === 0
  }

  private _startNextRoundTimer() {
    setTimeout(() => {
      this.nowRound = {min: this.nowRound.min, sec: this.nowRound.sec - 1};
      this.startTimer();
    }, 1000);
  }

  private _isFinishWholeRound() {
    return this.roundSrv.getNowRoundCount() > this.roundList.length;
  }

  private _isFinishWholeRepeat() {
    return this.roundSrv.getNowRepeatCount() > this.wholeRepeatCount;
  }
}
