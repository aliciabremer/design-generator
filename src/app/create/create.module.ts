import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { GetDesignsComponent } from './get-designs/get-designs.component';
import { DrawDesignComponent } from './get-designs/draw-design/draw-design.component';


@NgModule({
  declarations: [CreateComponent, GetDesignsComponent, DrawDesignComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    FormsModule
  ],
  exports: [CreateComponent]
})
export class CreateModule { }
