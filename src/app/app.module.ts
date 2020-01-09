import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDcwUCNoeToQ2g-iOzcyJigch_a5Xy88aU',
  authDomain: 'apartment-auditing-c9475.firebaseapp.com',
  databaseURL: 'https://apartment-auditing-c9475.firebaseio.com',
  projectId: 'apartment-auditing-c9475',
  storageBucket: 'apartment-auditing-c9475.appspot.com',
  messagingSenderId: '831580791351',
  appId: '1:831580791351:web:d54148e86294c6381215b2'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
