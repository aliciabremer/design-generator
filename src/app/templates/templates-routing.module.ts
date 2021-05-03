import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import {EditTempComponent } from './edit-temp/edit-temp.component';
import {DeleteTempComponent } from './delete-temp/delete-temp.component';

const routes: Routes = [
	{path:"templates", component: TemplatesComponent},
	{path:'templates/:id', component:EditTempComponent},
	{path:'delete-template/:id', component:DeleteTempComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
