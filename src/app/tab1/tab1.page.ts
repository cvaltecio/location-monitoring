import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../services/geolocation/geolocation.service';
import { FirebaseService } from '../services/firebase/firebase.service';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { AngularFireAction } from '@angular/fire/database';

const { Device } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public currentPosition: any = [];
  public watchPosition: any[] = [];
  public locations$: Observable<any[]>;

  constructor(
    private geolocation: GeolocationService,
    private firebase: FirebaseService
  ) { }

  ngOnInit() {
    this.getCurrentPosition();
    this.getWatchPosition();
    this.getLocations();
  }

  async getCurrentPosition() {
    this.currentPosition = await this.geolocation.getCurrentPosition();
  }

  async getWatchPosition() {
    const watch = await this.geolocation.watchPosition();
  }

  async getLocations() {
    const info = await Device.getInfo();
    this.firebase.getQuery(info.uuid)
      .subscribe((data: any) => this.locations$ = data.reverse());
  }



}
