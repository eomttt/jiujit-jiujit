import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  ROUND_STORAGE = 'rs';

  nowRoundCount = 1;
  nowRepeatCount = 1;

  initRounds: any = {
    list: [
      {
        active: {
          min: 1,
          sec: 0
        },
        rest: {
          min: 0,
          sec: 30
        }
      },
      {
        active: {
          min: 0,
          sec: 30
        },
        rest: {
          min: 0,
          sec: 15
        }
      },
    ],
    repeat: 3
  }

  rounds: any = {};



  constructor(private nativeStoragePlgn: NativeStorage) {

  }

  public getRounds() {
    return this.rounds;
  }

  public clearRound() {
    this.nowRoundCount = 1;
  }

  public getNowRoundCount() {
    return this.nowRoundCount;
  }

  public clearRepeat() {
    this.nowRepeatCount = 1;
  }

  public getNowRepeatCount() {
    return this.nowRepeatCount;
  }

  public setNextRound() {
    this.nowRoundCount = this.nowRoundCount + 1;
  }

  public setNextRepeat() {
    this.nowRepeatCount = this.nowRepeatCount + 1;
  }

  public setRounds() {
    return new Promise(async(resolve, reject) => {
      try {
        this.rounds = await this.nativeStoragePlgn.getItem(this.ROUND_STORAGE);

        console.log('Set saved rounds', this.rounds);
      } catch(error) {
        console.log('Get item error', error);

        this.rounds = this.initRounds;
      }

      resolve();
    });
  }

  public async addRound(round) {
    try {
      this.rounds.list.push(round);

      await this.nativeStoragePlgn.setItem(this.ROUND_STORAGE, this.rounds);
    } catch(error) {
      console.log('Add item error (Add round)', error);
    }
  }

  public async removeRound(index) {
    try {
      this.rounds.list.splice(index, 1);

      await this.nativeStoragePlgn.setItem(this.ROUND_STORAGE, this.rounds);
    } catch(error) {
      console.log('Add item error (Remove round)', error);
    }
  }

  public async setClearRepeatRound() {
    try {
      this.rounds.repeat = 1;

      await this.nativeStoragePlgn.setItem(this.ROUND_STORAGE, this.rounds);
    } catch(error) {
      console.log('Set clear repeat round error', error);
    }

  }

  public async addRepeatRound() {
    try {
      this.rounds.repeat = this.rounds.repeat + 1;

      await this.nativeStoragePlgn.setItem(this.ROUND_STORAGE, this.rounds);
    } catch(error) {
      console.log('Add repeat round error', error);
    }

  }

  public async substractRepeatRound() {
    try {
      this.rounds.repeat = this.rounds.repeat - 1;

      await this.nativeStoragePlgn.setItem(this.ROUND_STORAGE, this.rounds);
    } catch(error) {
      console.log('Subscract repeat round error', error);
    }
  }

}
