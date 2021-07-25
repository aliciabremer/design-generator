import { NgModule } from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PreferencesComponent } from './preferences.component';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesEditComponent } from './preferences-edit.component';
import { FilterFontsComponent } from './filter-fonts/filter-fonts.component';



@NgModule({
  declarations: [PreferencesComponent, PreferencesEditComponent, FilterFontsComponent],
  imports: [ CommonModule, PreferencesRoutingModule, FormsModule ],
  exports: [PreferencesComponent, PreferencesEditComponent]
})
export class PreferencesModule { }
