import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';

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
    private mobileAccessibility: MobileAccessibility,
    private roundSrv: RoundService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this._active();
    });
  }

  private _setLandscapeView() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  private _setRounds() {
    return this.roundSrv.setRounds();
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

  private _openMainPage() {
    this.router.navigate(['main']);
  }

  private _setScreenViewPort() {
    this.mobileAccessibility.setTextZoom(100);
    this.mobileAccessibility.usePreferredTextZoom(false);
  }

  private async _active() {
    this._setLandscapeView();
    this._setBackButtonEvent();
    this._setScreenViewPort();
    await this._setRounds();

    console.log('Open main page');

    this._openMainPage();
  }
}
