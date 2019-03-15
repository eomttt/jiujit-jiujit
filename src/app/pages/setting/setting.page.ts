import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { RoundService } from '../../services/round.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  showAddScheduleModal = false;

  rounds: any = {};

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private navCtrl: NavController,
              private roundSrv: RoundService,
              private alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.setSchedule();
  }

  public clickBackButton() {
    this.navCtrl.pop();
  }

  public addRound() {
    this.showAddScheduleModal = true;
  }

  public async removeSchedule(data) {
    const minRepeatAlert = await this.alertCtrl.create({
      header: 'Warning',
      message: 'Are you sure to remove?',
      buttons: [{
        text: 'Cancel',
        handler: () => {
          // Nothinge
        }
      }, {
        text: 'Ok',
        handler: () => {
          this._removeSchedule(data);
        }
      }]
    });

    await minRepeatAlert.present();
  }

  public addSchedule(data) {
    let saveData = {
      active: {
        min: data.activeMin,
        sec: data.activeSec
      },
      rest: {
        min: data.restMin,
        sec: data.restSec
      }
    };

    this.roundSrv.addRound(saveData);
    this.setSchedule();

    this.showAddScheduleModal = false;
  }

  public closeScheduleModal() {
    this.showAddScheduleModal = false;
  }

  public getRepeat() {
    let roundInfo = this.roundSrv.getRounds();
    return roundInfo.repeat;
  }

  public addRepeat() {
    this.roundSrv.addRepeatRound();
  }

  public async subtractRepeat() {
    this.roundSrv.substractRepeatRound();

    if (this.getRepeat() < 1) {
      const minRepeatAlert = await this.alertCtrl.create({
        header: 'Warning',
        message: 'Minimum repeat is 1',
        buttons: ['OK']
      });

      await minRepeatAlert.present();

      this.roundSrv.setClearRepeatRound();
    }
  }

  /*
   * Private function
   */

  private _removeSchedule(index) {
    this.roundSrv.removeRound(index);
  }

  private setSchedule() {
    this.rounds = this.roundSrv.getRounds();
  }
}
