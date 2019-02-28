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
  roundRepeat: any = 1;
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

  public initRound() {
    this.stopTimer();
    this.roundSrv.clearRound();
  }

  public startTimer() {
    if (this.timerMode === 'stop') {
      this.initScore();
    }

    this.timerMode = 'start';
  }

  public stopTimer() {
    this.timerMode = 'stop';

    this._setNextRound();
    // this.startTimer();
  }

  public pauseTimer() {
    this.timerMode = 'pause';
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

  /*
   * Private function
   */

  private _initRound() {
    let roundInfo = this.roundSrv.getRounds();

    this.roundList = roundInfo.list;
    this.roundRepeat = roundInfo.repeat;

    this.wholeRoundCount = this.roundList.length;

    this._setRound();
  }

  private _setRound() {
    this.nowRoundInfo = null;

    this.nowRoundCount = this.roundSrv.getNowRound();

    this.nowRoundInfo = this.roundList[this.nowRoundCount - 1];

    if (this.activeRound) {
      this.nowRound = this.nowRoundInfo.active;
    } else {
      this.nowRound = this.nowRoundInfo.rest;
    }
  }

  private _setNextRound() {
    if (this.activeRound) {
      if (this.nowRoundInfo.rest.min === 0 &&
          this.nowRoundInfo.rest.sec === 0) {
        this.roundSrv.setNextRound();
      } else {
        this.activeRound = false;
      }
    } else {
      this.activeRound = true;
      this.roundSrv.setNextRound();
    }

    this._setRound();
  }
}
