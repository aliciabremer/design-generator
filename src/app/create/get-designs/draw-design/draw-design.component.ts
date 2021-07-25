import { Component, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { DrawService } from '../../../core/draw.service';
import { DataService } from '../../../core/data.service';

import { ITemplate, IRectangle, ICircle, IText, IImage, IPinFolder, IUser } from '../../../shared/interfaces';


@Component({
  selector: 'app-draw-design',
  templateUrl: './draw-design.component.html',
  styleUrls: ['./draw-design.component.css']
})
export class DrawDesignComponent implements AfterViewInit {

  //the template to draw with
  private _template: ITemplate = {
    "id": "",
    "customerId": "",
    "dateCreated":"",
    "name": "",
    "categories": [],
    "width": 0,
    "height": 0,
    "shapes":[],
    "rectangles": [],
    "circles": [],
    "texts": [],
    "images": []
  };

  /**
   * Take the template information from parent component and assign it to _template
   * 
   * @param value - the template
   * @returns void
   */
  @Input('template') 
  set template(value: ITemplate) 
  {
    if (value) 
    {
      this._template = value;
    }
  }

  /**
   * Get the template information
   * 
   * @returns the template
   */
  get template(): ITemplate 
  {
    return this._template;
  }

  //the user
  private _user: IUser = {
		"name":"",
		"textType":[],
		"colours":[],
		"fonts":[],
  };

  /**
   * Take the user information from parent component and assign it to _user
   * 
   * @param value - the user
   * @returns void
   */
  @Input('user')
  set user(value: IUser) 
  {
    if (value)
    {
      console.log("getting user");
      this._user = value;
    }
  }
 
  /**
   * Get the user information
   * 
   * @returns the user
   */
  get user(): IUser
  {
    return this._user;
  } 

  //the folder to use to generate
  private _folder: IPinFolder = {
    "id": "",
    "customerId":"",
		"name":"",
		"dateCreated":"",
		"dateLastUsed":"",
		"categories":[],
		"text":[],
		"image":[]
  };

  /**
   * Take the folder information from parent component and assign it to _folder
   * 
   * @param value - the user
   * @returns void
   */
  @Input('folder')
  set folder(value: IPinFolder) 
  {
    if (value) 
    {
      this._folder = value;
    }
  } 

  /**
   * Get the folder information
   * 
   * @returns the folder
   */
  get folder(): IPinFolder 
  {
    return this._folder;
  }
    
  //the scaling value
  private _scaling: number = 0;

  /**
   * Take the scaling information from parent component and assign it to _scaling
   * 
   * @param value - the scaling value
   * @returns void
   */
  @Input() 
  set scaling(value: number)
  {
    if (value)
    {
      this._scaling = value;
    }
  }

  /**
   * Get the scaling number
   * 
   * @returns the scaling value
   */
  get scaling(): number 
  {
    return this._scaling;
  }

  textList:string[][] = []; //shuffled list of text
  imageList:string[] = []; //shuffled list of images

  /**
   * Constructor for this class - creating injectables
   *
   * @params drawService - Injectable drawService
   * @params dataService - Injectable dataService
   * @returns void
   */
  constructor(@Inject(DOCUMENT) document:any,
    private drawService: DrawService,
    private dataService: DataService) 
  { }

  /**
   * Drawing both the scaled and real canvases. First shuffle the lists of 
   * text for each text type and image.
   *
   * @returns void
   */
  ngAfterViewInit(): void 
  {
    //console.log("drawing the template");
  	//console.log("The template");
    //console.log(this.template);
    //console.log("This folder");
    //console.log(this.folder);

    //console.log(<HTMLCanvasElement>document.getElementById(this.template.name));
  	var c = <HTMLCanvasElement>document.getElementById(this.template.name);
  	c.height = this.template.height*0.2;
  	c.width = this.template.width*0.2;

    //console.log(<HTMLCanvasElement>document.getElementById(this.folder.name));
    var act = <HTMLCanvasElement>document.getElementById(this.folder.name);
    act.height = this.template.height;
    act.width = this.template.width;


    //shuffle text list for each text type
    for (var i:number = 0; i < this.user.textType.length; i++)
    {
      this.textList[i] = this.shuffleList(this.folder.text[i]);
    }
    //console.log(this.textList); 

    //shuffle the list of images
    this.imageList = this.shuffleList(this.folder.image);   

    //draw scaled design
  	if (c.getContext) 
  	{   
    	var ctx = c.getContext('2d')!; 
      console.log(ctx);
    	this.drawService.draw(ctx, this.template, this.user.colours, this.user.fonts, this.textList, this.imageList, this.scaling);

   }

   //draw real design
   if (act.getContext)
   {
      var actCtx = act.getContext('2d')!; 
      console.log(actCtx);
      this.drawService.draw(actCtx, this.template, this.user.colours, this.user.fonts, this.textList, this.imageList, 1);
   }

 }


  /**
   * Download the real canvas
   *
   * @returns void
   */
 download() : void
 { 
    var canvas = <HTMLCanvasElement>document.getElementById(this.folder.name);
    var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
  }

  /**
   * Shuffle the list passed in without changing the original and return the new array.
   *
   * @params array - the array to shuffle
   * @returns the shuffled array
   */
  shuffleList(array:any[]):any[]
  {
    const arr  = Object.assign([], array);

    for (let i = arr.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

}
