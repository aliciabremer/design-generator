import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { DataService } from './data.service';
import { SorterService } from './sorter.service';
import { DrawService } from './draw.service';
import { AuthService } from './auth.service';
import { FontsService } from './fonts.service';
import { EditTempService } from './edit-temp.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule 
  ],
  providers: [ 
  	DataService,
  	SorterService,
  	DrawService,
    AuthService,
    FontsService
  ]
})
export class CoreModule { }
