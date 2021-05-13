import { Component, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { DrawService } from '../../../core/draw.service';
import { DataService } from '../../../core/data.service';

import { ITemplate, IRectangle, ICircle, IText, IImage, IPinFolder, IUser } from '../../../shared/interfaces';


@Component({
  selector: 'app-draw-temp',
  templateUrl: './draw-temp.component.html',
  styleUrls: ['./draw-temp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DrawTempComponent implements AfterViewInit {

  private _template: ITemplate = {
      "id": 0,
      "customerId": "0",
      "dateCreated":"2021-03-21",
      "name": "temporary",
      "width": 0,
      "height": 0,
      "shapes":[[0,0]],
      "rectangles": [],
      "circles": [],
      "texts": [],
      "images": []
    };

    user: IUser = {
    	"id": "0",
		"name":"Your Name",
		"email":"JohnSmith@gmail.com",
		"templateId":0,
		"folderId":0,
		//acctItems:IPinAcct[];
		"textType":["title", "short title", "subtitle", "website"],
		"colours":["black", "white"],
		"fonts":["Arial"],
    }; 


  images:string[] = ["../../assets/temporary.png"];


    @Input() get template(): ITemplate {
        return this._template;
    }

    set template(temp: ITemplate) {
        if (temp) {
            this._template = temp;
        }
    }

  private _scaling: number = 0;
    @Input() get scaling(): number {
        return this._scaling;
    }

    set scaling(value: number) {
        if (value) {
            this._scaling = value;
        }
    }


  constructor(@Inject(DOCUMENT) document:any,
    private drawService: DrawService,
    private dataService: DataService) {

    this.dataService.getUser(this.template.customerId)
        .subscribe((u: IUser) => this.user = u);

  }

  ngAfterViewInit(): void 
  {

    console.log(this.template);
    console.log(<HTMLCanvasElement>document.getElementById(this.template.name));
  	var c = <HTMLCanvasElement>document.getElementById(this.template.name);
  	c.height = this.template.height*this.scaling;
  	c.width = this.template.width*this.scaling;


  	if (c.getContext) {   
    	var ctx = c.getContext('2d')!;  

    	console.log(ctx);
    	this.drawService.draw(ctx, this.template, this.user.colours, this.user.fonts, this.user.textType, this.images, this.scaling);

  }

}

}
