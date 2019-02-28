import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  nowRoundCount = 1;

  rounds: any = {};

  constructor() {

  }

  public setRounds() {
    this.rounds = {
      list: [
        {
          active: {
            min: 0,
            sec: 3
          },
          rest: {
            min: 0,
            sec: 3
          }
        },
        {
          active: {
            min: 0,
            sec: 3
          },
          rest: {
            min: 0,
            sec: 3
          }
        },
        {
          active: {
            min: 0,
            sec: 3
          },
          rest: {
            min: 0,
            sec: 3
          }
        },
        {
          active: {
            min: 0,
            sec: 3
          },
          rest: {
            min: 0,
            sec: 3
          }
        }
      ],
      repeat: 3
    };
  }

  public getRounds() {
    this.setRounds();
    return this.rounds;
  }

  public addRound(round) {
    this.rounds.list.push(round);
  }

  public clearRound() {
    this.nowRoundCount = 1;
  }

  public getNowRound() {
    return this.nowRoundCount;
  }

  public setNextRound() {
    this.nowRoundCount = this.nowRoundCount + 1;
  }
}
