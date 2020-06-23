import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        StatusBar.setBackgroundColor({ color: "#5260ff" });
        StatusBar.setStyle({ style: StatusBarStyle.Dark });
      }
      this.splashScreen.hide();
    });
  }
}
