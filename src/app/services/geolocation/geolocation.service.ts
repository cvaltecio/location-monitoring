import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { FirebaseService } from '../firebase/firebase.service';

const { Geolocation, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private firebase: FirebaseService
  ) { }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    return coordinates;
  }

  private async getDeviceInfo() {
    const info = await Device.getInfo();
    return info;
  }

  private organizeData(position: any, deviceInfo: any) {
    return {
      model: deviceInfo.model,
      manufacturer: deviceInfo.manufacturer,
      uuid: deviceInfo.uuid,
      platform: deviceInfo.platform,
      timestamp: position.timestamp,
      accuracy: position.coords.accuracy,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }
  }

  private async savePosition(data: any) {
    await this.firebase.save(data.uuid, data);
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, async (position, err) => {

      if (position) {
        const deviceInfo = await this.getDeviceInfo();
        const data = this.organizeData(position, deviceInfo);
        await this.savePosition(data);
        return position;
      } else {
        alert(err);
      }

    });
    console.log(wait);
  }


}
