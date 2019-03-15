import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { Media } from '@ionic-native/media/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            FormsModule
           ],
  providers: [
    StatusBar,
    SplashScreen,
    MobileAccessibility,
    Media,
    Vibration,
    NativeAudio,
    AdMobFree,
    Insomnia,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
