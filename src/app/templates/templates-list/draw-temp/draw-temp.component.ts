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
export class DrawTempComponent implements AfterViewInit 
{

  //the template to draw
  private _template: ITemplate = {
    "id": "0",
    "customerId": "0",
    "dateCreated":"2021-03-21",
    "name": "temporary",
    "categories": [],
    "width": 0,
    "height": 0,
    "shapes":[[0,0]],
    "rectangles": [],
    "circles": [],
    "texts": [],
    "images": []
  };

  /**
   * Get the value of the template to draw
   * 
   * @returns the template to draw
   */
  @Input() get template(): ITemplate 
  {
    return this._template;
  }

  /**
   * Take the template to draw from parent component and assign it to _template
   * 
   * @param temp - the template to draw
   * @returns void
   */
  set template(temp: ITemplate) 
  {
    if (temp) 
    {
      this._template = temp;
    }
  }

  //the user information
  user: IUser = {
		"name":"Your Name",
		//acctItems:IPinAcct[];
		"textType":["title", "short title", "subtitle", "website"],
		"colours":["black", "white"],
		"fonts":["Arial"],
    }; 

  //the location of the image
  images:string[] = ["../../assets/temporary.png"];


    
  //the value to scale by
  private _scaling: number = 0;
  
  /**
   * Get the scaling value to draw the template with
   * 
   * @returns the scaling value
   */
  @Input() get scaling(): number 
  {
    return this._scaling;
  }

  /**
   * Take the scaling value from parent component and assign it to _scaling
   * 
   * @param value - the scaling amount
   * @returns void
   */
  set scaling(value: number)
  {
    if (value) 
    {
      this._scaling = value;
    }
  }

  /**
   * Constructs the injectables and subscribes to the user.
   *
   * @param document - injectable document
   * @param drawService - injectable of DrawService
   * @param dataService - injectable of Dataservice
   * @returns void
   */
  constructor(@Inject(DOCUMENT) document:any,
    private drawService: DrawService,
    private dataService: DataService) {

    this.dataService.getUser(this.template.customerId)
        .subscribe((u: IUser) => this.user = u);

  }

  /**
   * Draws the template using the canvas.
   *
   * @returns void
   */
  ngAfterViewInit(): void 
  {

    console.log(this.template);
    console.log(<HTMLCanvasElement>document.getElementById(this.template.name));
  	var c = <HTMLCanvasElement>document.getElementById(this.template.name);
  	c.height = this.template.height*this.scaling;
  	c.width = this.template.width*this.scaling;

    let textList:string[][] = this.convertText();


  	if (c.getContext) 
    {   
    	var ctx = c.getContext('2d')!;  

    	console.log(ctx);
    	this.drawService.draw(ctx, this.template, this.user.colours, this.user.fonts, textList, this.images, this.scaling);

    }

  }

  /**
   * Convert the one dimensional array of text types to a two dimensional array for drawing
   * the template
   *
   * @returns the two d array of text types
   */
  convertText():string[][]
  {
    let textList:string[][] = []
    for (let i = 0; i < this.user.textType.length; i++)
    { 
      textList[i] = [];
      textList[i][0] = this.user.textType[i];
    }
    return textList;
  }

}
