import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { IRectangle } from '../../../shared/interfaces';


@Component({
  selector: 'app-edit-rect',
  templateUrl: './edit-rect.component.html',
  styleUrls: ['./edit-rect.component.css']
})
export class EditRectComponent implements OnInit {

	private _rect: IRectangle = {
		"id":0,
		"x":0,
		"y":0,
		"width":0,
		"height":0,
    "colour":0
	};

  private _colours: string[] = [];
  private _width: number = 0;
  private _height: number = 0;

  @Output() updatedRect = new EventEmitter<IRectangle>();
  @Output() editing = new EventEmitter<boolean>();
  @Output() deleting = new EventEmitter<boolean>();

  //take the rectangle as input
  @Input('rect')
  set rect(rect: IRectangle) {
    this._rect = rect;
  }
 
  get rect(): IRectangle {
    return this._rect;
  }

  //take colour options in gray scale as input
  @Input('colours')
  set colours(colours: string[])
  {
    this._colours = colours;
  }

  get colours(): string[]
  {
    return this._colours;
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

  constructor(@Inject(DOCUMENT) document:any) { }

  ngOnInit(): void {
    console.log("width "+this.width);
    console.log("height "+this.height);
    console.log()
    console.log("colours " + this.colours);
  }

  getXPos(event: any) : void
  {
    this.rect.x = event.target.valueAsNumber;
    this.updatedRect.emit(this.rect);
    console.log("colours " + this.colours);
    //console.log("Change in x");
    //console.log(this.rect);
  }

  getYPos(event: any) : void
  {
    this.rect.y = event.target.valueAsNumber;
    this.updatedRect.emit(this.rect);
    //console.log("Change in y");
    //console.log(this.rect);
  }

  getXWidth(event: any) : void
  {
    this.rect.width = event.target.valueAsNumber;
    this.updatedRect.emit(this.rect);
    //console.log("Change in width");
    //console.log(this.rect);
  }

  getYHeight(event: any) : void
  {
    this.rect.height = event.target.valueAsNumber;
    this.updatedRect.emit(this.rect);
    //console.log("Change in height");
    //console.log(this.rect);
  }

  selectColour(event:any) : void
  {
      console.log(event);
      this.rect.colour =+ event;
      console.log("changing colour");
      console.log(this.rect);
      this.updatedRect.emit(this.rect);
  }

  trackByIndex(indexOfElement: number, obj: any):any {
    return indexOfElement;
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
