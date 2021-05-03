import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PinsComponent } from './pins.component';
import { DisplayPinComponent } from './display-pin/display-pin.component';
import { EditPinComponent } from './edit-pin/edit-pin.component';
import { DeletePinComponent } from './delete-pin/delete-pin.component';

const routes: Routes = [
	{path: 'folders', component: PinsComponent},
	{path:'folders/:id', component:DisplayPinComponent},
	{path:'edit-folders/:id', component:EditPinComponent},
	{path:'delete-folders/:id', component:DeletePinComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinsRoutingModule { }
