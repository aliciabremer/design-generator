import { Component, AfterViewInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { DrawService } from '../../core/draw.service';
import { EditTempService } from '../../core/edit-temp.service';
import { ITemplate, IRectangle, ICircle, IText, IImage, IUser, IPinFolder } from '../../shared/interfaces';

@Component({
  selector: 'app-edit-temp',
  templateUrl: './edit-temp.component.html',
  styleUrls: ['./edit-temp.component.css']
})
export class EditTempComponent implements AfterViewInit 
{

  scaling:number;

  //user data
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

  //the template to edit
  private _template:ITemplate = {
      "id": "",
      "customerId": "",
      "dateCreated":"",
      "name": "",
      "categories": [],
      "width": 0,
      "height": 0,
      "shapes":[[]],
      "rectangles": [],
      "circles": [],
      "texts": [],
      "images": []
  };

  /**
   * Take the template to edit from parent component and assign it to _template
   * 
   * @param value - the template to edit
   * @returns void
   */
  @Input('template')
  set template(value: ITemplate) 
  {
    if (value)
    {
      console.log("setting template");
      this._template = value;
    }
  }
 
  /**
   * Get the value of the template to edit
   * 
   * @returns the template to edit
   */
  get template(): ITemplate
  {
    return this._template;
  }

  //EventEmitter to output edited template to parent
  @Output() templateChange = new EventEmitter<ITemplate>();

  //output for when done editing: 0 to update, 1 to cancel, 2 to delete
  @Output() updateAndDone = new EventEmitter<number>();

  //path to temporary image
  images:string[] = ["../../assets/temporary.png"];

  //boolean values to store selected item
  isRect:boolean;
  isText:boolean;
  isCirc:boolean;
  isImage:boolean;

  deleting:boolean;

  //id of selected shape that is being editing
  shapeId:number;

  //gray scale of user colours
  coloursGray:string[];
  modifiedText:string[][];

  /**
   * Constructor for this class - creating injectables and initializing global variables
   *
   * @param document - injectable DOCUMENT
   * @param drawService - injectable DrawService
   * @param editService - injectable EditTempService
   * @returns void
   */
  constructor(@Inject(DOCUMENT) document:any,
              private drawService: DrawService,
              private editService: EditTempService) 
  {

    this.scaling = 0.3;

    this.isRect = false;
    this.isText = false;
    this.isCirc = false;
    this.isImage = false;
    this.deleting = false;

    this.shapeId = 0;
    this.coloursGray = [];
    this.modifiedText = [];
  }


  /**
   * Once view is initialized, draw the template.
   *
   * @returns void
   */
  ngAfterViewInit(): void 
  {
    this.drawTemplate();
  }


  /**
   * Draw the template. Get the canvas element, add event listener, set height, and then
   * call the draw service to draw the template.
   *
   * @param textType - the type of text to add
   * @returns void
   */
  drawTemplate()
  {
    console.log(this.template);
    console.log(<HTMLCanvasElement>document.getElementById(this.template.name));
    var c = <HTMLCanvasElement>document.getElementById(this.template.name);
    c.height = this.template.height*this.scaling;
    c.width = this.template.width*this.scaling;

    this.coloursGray = this.convertColours(this.user.colours);
    console.log(this.user);

    this.modifiedText = this.convertText();

    console.log("text list in draw temp for edit temp " + this.modifiedText);
    console.log(this.user);

    if (c.getContext) 
    {   
      var ctx = c.getContext('2d')!;  

      console.log(ctx);
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle="white";
      ctx.fillRect(0, 0, c.width, c.height);
      this.drawService.draw(ctx, this.template, this.coloursGray, this.user.fonts, this.modifiedText, this.images, this.scaling);
      
      this.editService.select(ctx, this.isRect, this.isCirc, this.isText, this.isImage, this.shapeId, this.template, this.scaling)

     }
  }

  /**
   * Determine which shape was clicked and turn editing on for that shape. If 
   * no shape was clicked, turn all editing off.
   *
   * @param e - the click event
   * @returns void
   */
  getClick(e:any): void
  {
    var c = <HTMLCanvasElement>document.getElementById(this.template.name);
    let arr:number[] = this.editService.clickResponse(c, e, this.template, this.scaling);

    switch(arr[0])
    {
      case (0): {this.isRect = true; this.shapeId = arr[1]; break;}
      case (1): {this.isCirc = true; this.shapeId = arr[1]; break;}
      case (2): {this.isText = true; this.shapeId = arr[1]; break;}
      case (3): {this.isImage = true; this.shapeId = arr[1]; break;}
      default: {this.isRect=this.isCirc=this.isText=this.isImage=false; break;}
    }
  }

  /**
   * Create a new shape in the templates and get the id.
   *
   * @param num - the type of shape to add
   * @returns void
   */
  addElement(num: number) : void
  {
    this.shapeId = this.editService.addShape(num, this.template);
    console.log("adding element -- check template");
    console.log(this.template);
    switch(num)
    {
      case (0): {this.isRect = true; break;}
      case (1): {this.isCirc = true; break;}
      case (2): {this.isText = true; break;}
      case (3): {this.isImage = true; break;}
      default: {console.log("no shape"); break;}
    }
    this.drawTemplate();
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
      textList[i].push(this.user.textType[i]);
    }
    console.log(textList);
    return textList;
  }

  /**
   * Take the new rectangle and update the template with the new rectangle.
   *
   * @param r - the updated rectangle
   * @returns void
   */
  updateRect(r:any): void
  {
    console.log(this.template);
    this.template.rectangles[this.shapeId] = r;
    this.drawTemplate();
    console.log("updating rect -- change to vals");
  }

  /**
   * Take the new circle and update the template with the new circle.
   *
   * @param c - the updated circle
   * @returns void
   */
  updateCircle(c:ICircle) : void
  {
    console.log(this.template);
    this.template.circles[this.shapeId] = c;
    this.drawTemplate();
  }

  /**
   * Take the new image and update the template with the new image.
   *
   * @param i - the updated image
   * @returns void
   */
  updateImage(i: IImage) : void
  {
    console.log(this.template);
    this.template.images[this.shapeId] = i;
    this.drawTemplate();
  }

  /**
   * Take the new text and update the template with the new text.
   *
   * @param t - the updated text
   * @returns void
   */
  updateText(t: IText) : void
  {
    console.log(this.template);
    this.template.texts[this.shapeId] = t;
    this.drawTemplate();
  }

  /**
   * Convert the colours list to a list of colours in gray scale.
   *
   * @param c - the list of colours
   * @returns the list of colours as gray scale
   */
  convertColours(c: string[]): string[]
  {
    var cols = [];
    var i:number; 

    console.log("number of colours in list: " + c.length);

    for (i = 0; i < c.length; i++)
    {
      var r:number = 0+Math.round(255/c.length)*i;
      console.log("RGB num: " +r);
      var n:string = r.toString(16);
      console.log("colour in gray: " + n +n + n);

      cols.push("#"+n+n+n);
    }

    console.log("colours in edit-temp" + cols);
    
    return cols;
  }

  /**
   * Change the preferences by outputting the updated template
   *
   * @returns void
   */
  changePreferences() : void
  {
    this.templateChange.emit(this.template);
  }

  /**
   * Delete the shape with the specified id if isDeleting is true.
   *
   * @params isDeleting - true if supposed to delete shape; false otherwise
   * @params id - location of the shape to delete
   * @returns void
   */
  deleteShape(isDeleting:any, id:number) : void
  {
    if (isDeleting.value)
    {
      if (id==0)
      {
        this.template.rectangles.splice(this.shapeId,1);
      }
      else if (id==1)
      {
        this.template.circles.splice(this.shapeId,1);
      }
      else if (id==2)
      {
        this.template.texts.splice(this.shapeId,1);
      }
      else if (id==3)
      {
        this.template.images.splice(this.shapeId,1);
      }
    }
  }

  /**
   * Done editing, so send back updated folder information and send message to update
   * or create folder in database (0)
   *
   * @returns void
   */
  done() : void
  {
    this.changePreferences();
    this.updateAndDone.emit(0);
  }

  /**
   * User chose to cancel, so don't send updated info and emit message to neither update
   * nor create folder in database (1)
   *
   * @returns void
   */
  cancel() : void
  {
    this.updateAndDone.emit(1);
  }

  /**
   * User wants to delete, so confirm user's choice by showing confirmation to delete
   *
   * @returns void
   */
  tryToDelete() : void
  {
    this.deleting = true;
  }

  /**
   * User does not want to delete, so change deleting back to false.
   *
   * @returns void
   */
  cancelDelete() : void
  {
    this.deleting = false;
  }

  /**
   * Send message to parent component to delete the folder (2)
   *
   * @returns void
   */
  delete() : void
  {
    this.updateAndDone.emit(2);
  }

}
