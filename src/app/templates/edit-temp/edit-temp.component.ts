import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { DataService } from '../../core/data.service';
import { DrawService } from '../../core/draw.service';
import { ITemplate, IRectangle, ICircle, IText, IImage, IUser, IPinFolder } from '../../shared/interfaces';

@Component({
  selector: 'app-edit-temp',
  templateUrl: './edit-temp.component.html',
  styleUrls: ['./edit-temp.component.css']
})
export class EditTempComponent implements OnInit, AfterViewInit {

  template:any;
  scaling:number;
  id:number;

  user: IUser = {
      "id": "0",
    "name":"Your Name",
    "email":"JohnSmith@gmail.com",
    "templateId":0,
    "folderId":0,
    //acctItems:IPinAcct[];
    "textType":["title", "short title", "subtitle", "website"],
    "colours":["black", "white"],
    "fonts":["Arial", "Casual"],
    } 

  images:string[] = ["../../assets/temporary.png"];

  isRect:boolean;
  isText:boolean;
  isCircle:boolean;
  isImage:boolean;

  shapeId:number;

  coloursGray:string[];


  constructor(private dataService:DataService,
  	@Inject(DOCUMENT) document:any,
  	private route: ActivatedRoute,
    private drawService: DrawService) {

    this.scaling = 0.5;
    this.id = 0;

    this.isRect = false;
    this.isText = false;
    this.isCircle = false;
    this.isImage = false;

    this.shapeId = 0;
    this.coloursGray = [];
  }

  ngOnInit(): void {
  	this.id = +this.route.snapshot.paramMap.get('id')!;
  	console.log(this.id);

    this.dataService.getTemplate(this.id)
            .subscribe((t: ITemplate) => this.template = t);
    console.log(this.template);

    this.dataService.getUser(this.template.customerId)
        .subscribe((u: IUser) => this.user = u);

  }

  ngAfterViewInit(): void 
  {

    
    this.drawTemplate();

    this.coloursGray = this.convertColours(this.user.colours);
    console.log("ngOnInit: " + this.coloursGray);

     var rect = <HTMLCanvasElement>document.getElementById("square");
     if (rect.getContext) {
      var ctxRect = rect.getContext('2d')!;
      ctxRect.fillStyle = "black";
      ctxRect.fillRect(0, 0, 50, 50);
     }

     //rect.addEventListener('click', this.addRect);


     var circ = <HTMLCanvasElement>document.getElementById("circle");
     if (circ.getContext) {
      var ctxCirc = circ.getContext('2d')!;
      ctxCirc.fillStyle = "black";
      ctxCirc.beginPath();
  ctxCirc.arc(25, 25, 25, 0, 2 * Math.PI, false);
  ctxCirc.fill();
     }

     //add ability to scale circle to oval

     //circ.addEventListener('click', this.addCircle);

     var text = <HTMLCanvasElement>document.getElementById("text");
     if (text.getContext) {
      var ctxText = text.getContext('2d')!;
      ctxText.fillStyle="black";
      ctxText.font = "25px Arial";
      ctxText.fillText("Text", 0, 25);
     }

     //text.addEventListener('click', this.addText);


     var pattern = new Image();
     pattern.src = "../../assets/temporary.png";

     var img = <HTMLCanvasElement>document.getElementById("image");
     if (img.getContext) {
      var ctxImg = img.getContext('2d')!;
      ctxImg.drawImage(pattern, 0, 0, 50, 50);
      console.log("getting image");
      console.log(pattern);
     }

     //img.addEventListener('click', this.addImage);

  
  }


  drawTemplate()
  {
    console.log(this.template);
    console.log(<HTMLCanvasElement>document.getElementById(this.template.name));
    var c = <HTMLCanvasElement>document.getElementById(this.template.name);
    c.height = this.template.height*this.scaling;
    c.width = this.template.width*this.scaling;


    if (c.getContext) {   
      var ctx = c.getContext('2d')!;  

      console.log(ctx);
      ctx.clearRect(0, 0, c.width, c.height);

      this.drawService.draw(ctx, this.template, this.coloursGray, this.user.fonts, this.user.textType, this.images, this.scaling);
      
     }
  }

  addRect()
  {
    console.log(this.template);
    this.template.rectangles.push({
          "id": 3, //fix id
          "x": 0,
          "y": 0,
          "height": 200,
          "width": 200,
          "colour":0
    });
    this.drawTemplate();
    this.isRect = true;
  }

  addCircle()
  {
    console.log(this.template);
    this.template.circles.push({
          "id": 3,
          "xPos": 100,
          "yPos": 100,
          "radius": 500,
          "colour": 0
    });
    this.drawTemplate();

    this.isCircle = true;
  }

  addText()
  {
    console.log(this.template);
    this.template.texts.push({
        "id": "1",
        "size": 30,
        "type": 0,
        "x":0,
        "y":0,
        "font":0,
        "colour": 0,
        "maxWidth":0,
        "height": 0
    });
    this.drawTemplate();

    this.isText = true;
  }

  addImage()
  {
    console.log(this.template);
    this.template.images.push({
      "id":1,
        "x":100,
        "y":100,
        "width":300,
        "height": 300
    });
    this.drawTemplate();

    this.isImage = true;
  }

  updateRect(r:IRectangle): void
  {
    console.log(this.template);
    this.template.rectangles[this.shapeId] = r;
    this.drawTemplate();
  }

  updateCircle(c:ICircle) : void
  {
    console.log(this.template);
    this.template.circles[this.shapeId] = c;
    this.drawTemplate();
  }

  updateImage(i: IImage) : void
  {
    console.log(this.template);
    this.template.images[this.shapeId] = i;
    this.drawTemplate();
  }

  updateText(t: IText) : void
  {
    console.log(this.template);
    this.template.texts[this.shapeId] = t;
    this.drawTemplate();
  }

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

  changePreferences()
  {
    this.dataService.changeTemplate(this.template).subscribe((t: ITemplate) => this.template = t);
  }

  delete(isDeleting:any, id:number) : void
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

}

/*
@Input()  size: number | string;
  @Output() sizeChange = new EventEmitter<number>();
*/
