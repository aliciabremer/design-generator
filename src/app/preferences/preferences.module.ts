import { NgModule } from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PreferencesComponent } from './preferences.component';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesEditComponent } from './preferences-edit.component';



@NgModule({
  declarations: [PreferencesComponent, PreferencesEditComponent],
  imports: [ CommonModule, PreferencesRoutingModule, FormsModule ],
  exports: [PreferencesComponent, PreferencesEditComponent]
})
export class PreferencesModule { }

/*Fix id, add in text name preferences... also logo*/
