import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

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
              private roundSrv: RoundService) {

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

  /*
   * Private function
   */

  private setSchedule() {
    this.rounds = this.roundSrv.getRounds();
  }
}
