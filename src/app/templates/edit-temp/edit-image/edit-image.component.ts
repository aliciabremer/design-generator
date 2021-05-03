import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IImage } from '../../../shared/interfaces';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  private _img: IImage = {
  	"id":0,
	   "x":0,
	   "y":0,
     "width":500,
     "height":500
  };

  private _width: number = 0;
  private _height: number = 0;

  @Output() updatedImage = new EventEmitter<IImage>();
  @Output() editing = new EventEmitter<boolean>();
  @Output() deleting = new EventEmitter<boolean>();

  @Input('img')
  set img(img: IImage) {
    this._img = img;
  }
 
  get img(): IImage {
    return this._img;
  }

  //get width of canvas as input
  @Input('width')
  set width(width: number)
  {
    this._width = width;
  }

  get width(): number
  {
    return this._width;
  }

  //get height of canvas as input
  @Input('height')
  set height(height: number)
  {
    this._height = height;
  }

  get height(): number
  {
    return this._height;
  }

  constructor() { }

  ngOnInit(): void {
    console.log("width "+this.width);
    console.log("height "+this.height);
    console.log()
  }

  getXPos(event: any) : void
  {
    this.img.x = event.target.valueAsNumber;
    this.updatedImage.emit(this.img);
    //console.log("Change in x");
    //console.log(this.rect);
  }

  getYPos(event: any) : void
  {
    this.img.y = event.target.valueAsNumber;
    this.updatedImage.emit(this.img);
    //console.log("Change in y");
    //console.log(this.rect);
  }

  getXWidth(event: any) : void
  {
    this.img.width = event.target.valueAsNumber;
    this.updatedImage.emit(this.img);
    //console.log("Change in width");
    //console.log(this.rect);
  }

  getYHeight(event: any) : void
  {
    this.img.height = event.target.valueAsNumber;
    this.updatedImage.emit(this.img);
    //console.log("Change in height");
    //console.log(this.rect);
  }


  finished()
  {
    this.editing.emit(false);
  }

  delete()
  {
    this.deleting.emit(true);
    this.finished();
  }
}
