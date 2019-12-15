import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule , FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';



import {  ObjetoComponent } from './cpmponentes/objeto/objeto.component';
import { AddComponent } from "./cpmponentes/add/add.component";

import {FormsModule} from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { firebaseConfig } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";



@NgModule({
  declarations: [
    AppComponent,ObjetoComponent,
    AddComponent
  ],
  entryComponents: [
    ObjetoComponent,
    AddComponent
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserModule, 
    AngularFireAuthModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,

  ],

  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: FirestoreSettingsToken, useValue: {}}
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
