import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  imports:      [ CommonModule, FormsModule, HomeRoutingModule ],
  declarations: [ HomeComponent, LogInComponent, SignUpComponent ],
  exports: [ HomeComponent ]
})
export class HomeModule { }