import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PinsRoutingModule } from './pins-routing.module';
import { PinsComponent } from './pins.component';
import { PinsListComponent } from './pins-list/pins-list.component';
import { FilterListComponent } from './pins-list/filter-list/filter-list.component';
import { EditPinComponent } from './edit-pin/edit-pin.component';

@NgModule({
  declarations: [PinsComponent, PinsListComponent, FilterListComponent, EditPinComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PinsRoutingModule
  ],
  exports: [PinsComponent]
})
export class PinsModule { }

/*Eventually add more than one page for the pins... (?)*/
