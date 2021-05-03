import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferencesComponent } from './preferences.component';
import { PreferencesEditComponent } from './preferences-edit.component';

const routes: Routes = [
	{path: 'preferences', component: PreferencesComponent},
  { path: 'edit', component: PreferencesEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencesRoutingModule { 

}