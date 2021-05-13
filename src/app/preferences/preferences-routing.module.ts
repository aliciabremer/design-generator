import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogIn = () => redirectUnauthorizedTo(['log-in']);

import { PreferencesComponent } from './preferences.component';
import { PreferencesEditComponent } from './preferences-edit.component';

const routes: Routes = [
	{path: 'preferences', component: PreferencesComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogIn }},
  { path: 'edit', component: PreferencesEditComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogIn }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencesRoutingModule { 

}