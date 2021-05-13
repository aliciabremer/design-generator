import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';

import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToAccount = () => redirectLoggedInTo(['create']);

const routes: Routes = [
	{path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAccount }},
	{path: 'log-in', component: LogInComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAccount }},
	{path: 'sign-up', component: SignUpComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAccount }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule 
{
	
}