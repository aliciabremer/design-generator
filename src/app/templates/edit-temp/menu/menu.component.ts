import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit 
{
  //output type of shape added
  @Output() addNewElement = new EventEmitter<number>();

  /**
   * Constructor for this class - creating injectable
   *
   * @param document - injectable Document
   * @returns void
   */
  constructor(@Inject(DOCUMENT) document:any) { }

  /**
   * After the view is initilaized, draw the rectangle, circle, text and image to create new objects.
   *
   * @returns void
   */
  ngAfterViewInit(): void 
  {
  	var rect = <HTMLCanvasElement>document.getElementById("square");
     if (rect.getContext) {
      var ctxRect = rect.getContext('2d')!;
      ctxRect.fillStyle = "black";
      ctxRect.fillRect(0, 0, 50, 50);
     }


     var circ = <HTMLCanvasElement>document.getElementById("circle");
     if (circ.getContext) 
     {
      var ctxCirc = circ.getContext('2d')!;
      ctxCirc.fillStyle = "black";
      ctxCirc.beginPath();
      ctxCirc.arc(25, 25, 25, 0, 2 * Math.PI, false);
      ctxCirc.fill();
     }


     var text = <HTMLCanvasElement>document.getElementById("text");
     if (text.getContext) 
     {
      var ctxText = text.getContext('2d')!;
      ctxText.fillStyle="black";
      ctxText.font = "25px Arial";
      ctxText.fillText("Text", 0, 25);
     }

     //text.addEventListener('click', this.addText);


     var pattern = new Image();
     pattern.src = "../../../assets/temporary.png";

     var img = <HTMLCanvasElement>document.getElementById("image");
     if (img.getContext) 
     {
      var ctxImg = img.getContext('2d')!;

      var hRatio : number = img.width  / pattern.width    ;
      var vRatio : number =  img.height / pattern.height  ;
      var ratio : number  = Math.max ( hRatio, vRatio );
      var centerShift_x : number = ( img.width - pattern.width*ratio ) / 2;
      var centerShift_y : number = ( img.height - pattern.height*ratio ) / 2;  
      ctxImg.drawImage(pattern, 0,0, pattern.width, pattern.height,
                        centerShift_x,centerShift_y,pattern.width*ratio, pattern.height*ratio);  
      console.log("getting image");
      console.log(pattern);
     }

     //img.addEventListener('click', this.addImage);
  }

  /**
   * When element added, send message to output
   *
   * @param num - the type of shape
   * @returns void
   */
  addEle(num:number): void
  {
  	this.addNewElement.emit(num);
  }

}