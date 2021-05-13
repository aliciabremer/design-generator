import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard'; 
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { environment } from '../environments/environment';

@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebase), AngularFireAuthGuardModule, AngularFireDatabaseModule],
  exports: [AngularFireModule, AngularFireAuthModule],
})
export class AppFirebaseModule { }
