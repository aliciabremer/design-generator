import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { SharedModule } from '../shared/shared.module';
import { FilterTempComponent } from './templates-list/filter-temp/filter-temp.component';
import { CreateTempComponent } from './create-temp/create-temp.component';
import { EditTempComponent } from './edit-temp/edit-temp.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { DrawTempComponent } from './templates-list/draw-temp/draw-temp.component';
import { EditRectComponent } from './edit-temp/edit-rect/edit-rect.component';
import { EditCircComponent } from './edit-temp/edit-circ/edit-circ.component';
import { EditTextComponent } from './edit-temp/edit-text/edit-text.component';
import { EditImageComponent } from './edit-temp/edit-image/edit-image.component';
import { MenuComponent } from './edit-temp/menu/menu.component';


@NgModule({
  declarations: [TemplatesComponent, FilterTempComponent, CreateTempComponent, 
  				EditTempComponent, TemplatesListComponent, 
  				DrawTempComponent, EditRectComponent, EditCircComponent, EditTextComponent,
  				 EditImageComponent,
  				 MenuComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [TemplatesComponent]
})
export class TemplatesModule { }
