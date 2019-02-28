import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.scss'],
})
export class ScheduleAddComponent implements OnInit {

  @Output()
  setSchedule = new EventEmitter;

  @Output()
  cancel = new EventEmitter;

  activeMin:any = 0;
  activeSec:any = 0;
  restMin:any = 0;
  restSec:any = 0;

  constructor(private alertCtrl: AlertController) {

  }

  ngOnInit() {}

  public cancelSchedule() {
    this.cancel.emit();
  }

  public async confirmSchedule() {

    const maxTimeAlert = await this.alertCtrl.create({
      header: 'Warning',
      message: 'Maximum time is 59',
      buttons: ['OK']
    });

    const minTimeAlert = await this.alertCtrl.create({
      header: 'Warning',
      message: 'Minimum Active time is 1sec',
      buttons: ['OK']
    })

    if (this.activeMin >= 60) {
      await maxTimeAlert.present();

      this.activeMin = 59;
      return;
    } else if (this.activeSec >= 60) {
      await maxTimeAlert.present();

      this.activeSec = 59;
      return;
    } else if (this.restMin >= 60) {
      await maxTimeAlert.present();

      this.restMin = 59;
      return;
    } else if (this.restSec >= 60) {
      await maxTimeAlert.present();

      this.restSec = 59;
      return;
    }

    if (this.activeMin === 0 &&
        this.activeSec === 0) {
      await minTimeAlert.present();
      return;
    }

    this.setSchedule.emit({
      activeMin: this.activeMin,
      activeSec: this.activeSec,
      restMin: this.restMin,
      restSec: this.restSec
    });
  }

}
