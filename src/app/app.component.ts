import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

import { RoundService } from './services/round.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  PUBLIC_MODE = true;

  bannerId: any = null;
  interstitialId: any = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private navCtrl: NavController,
    private mobileAccessibility: MobileAccessibility,
    private admobFree: AdMobFree,
    private insomnia: Insomnia,
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

  private _setAdmob() {
    if (this.platform.is('android')) {
      this.bannerId = 'ca-app-pub-3940256099942544/6300978111';
      this.interstitialId = 'ca-app-pub-3940256099942544/1033173712';
    } else if (this.platform.is('ios')) {
      this.bannerId = 'ca-app-pub-3940256099942544/6300978111';
      this.interstitialId = 'ca-app-pub-3940256099942544/4411468910';
    }

    if (this.PUBLIC_MODE) {
      if (this.platform.is('android')) {
        this.bannerId = 'ca-app-pub-9152190009267204/4531117007';
        this.interstitialId = 'ca-app-pub-9152190009267204/4531117007';
      } else if (this.platform.is('ios')) {
        this.bannerId = 'ca-app-pub-9152190009267204/4531117007';
        this.interstitialId = 'ca-app-pub-9152190009267204/4531117007';
      }
    }

    const bannerConfig = {
      id: this.bannerId,
      isTesting: false,
    };

    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then(() => {
      console.log('Banner prepared.');
    }).catch((error) => {
      console.log('Error to prepare Banner. ', error);
    });
  }

  private _keepAwakeApp() {
    this.insomnia.keepAwake();
  }

  private async _active() {
    this._keepAwakeApp();
    this._setLandscapeView();
    this._setBackButtonEvent();
    this._setScreenViewPort();
    this._setAdmob();
    await this._setRounds();

    this._openMainPage();
  }
}
