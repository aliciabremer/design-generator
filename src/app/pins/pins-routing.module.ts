import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogIn = () => redirectUnauthorizedTo(['log-in']);

import { PinsComponent } from './pins.component';
import { DisplayPinComponent } from './display-pin/display-pin.component';
import { EditPinComponent } from './edit-pin/edit-pin.component';
import { DeletePinComponent } from './delete-pin/delete-pin.component';

const routes: Routes = [
	{path: 'folders', component: PinsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogIn }},
	{path:'folders/:id', component:DisplayPinComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogIn }},
	{path:'edit-folders/:id', component:EditPinComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogIn }},
	{path:'delete-folders/:id', component:DeletePinComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogIn }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinsRoutingModule { }
