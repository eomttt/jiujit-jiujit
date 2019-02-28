import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { RoundService } from './services/round.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private navCtrl: NavController,
    private roundSrv: RoundService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this._setLandscapeView();
      this._setRounds();
      this._setBackButtonEvent();
    });
  }

  private _setLandscapeView() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  private _setRounds() {
    this.roundSrv.setRounds();
  }

  private _setBackButtonEvent() {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      console.log('Backbutton control', this.router.url);

      if (this.router.url === '/main') {
        navigator['app'].exitApp();
      } else {
        this.navCtrl.pop();
      }
    });
  }
}
