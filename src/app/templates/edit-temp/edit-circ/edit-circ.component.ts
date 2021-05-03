import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ICircle } from '../../../shared/interfaces';

@Component({
  selector: 'app-edit-circ',
  templateUrl: './edit-circ.component.html',
  styleUrls: ['./edit-circ.component.css']
})
export class EditCircComponent implements OnInit {

	private _circ: ICircle = {
    "id":0,
    "xPos":0,
    "yPos":0,
    "radius":0,
    "colour":0
  };

  private _colours: string[] = [];
  private _width: number = 0;
  private _height: number = 0;
  
  @Output() updatedCircle = new EventEmitter<ICircle>();
  @Output() editing = new EventEmitter<boolean>();
  @Output() deleting = new EventEmitter<boolean>();

  @Input('circ')
  set circ(circ: ICircle) {
    this._circ = circ;
  }
 
  get circ(): ICircle {
    return this._circ;
  }

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

  constructor() { }

  ngOnInit(): void {
  }

  getXPos(event: any) : void
  {
    this.circ.xPos = event.target.valueAsNumber;
    this.updatedCircle.emit(this.circ);
    //console.log("colours " + this.colours);
    //console.log("Change in x");
    //console.log(this.rect);
  }

  getYPos(event: any) : void
  {
    this.circ.yPos = event.target.valueAsNumber;
    this.updatedCircle.emit(this.circ);
    //console.log("Change in y");
    //console.log(this.rect);
  }

  getRadius(event: any) : void
  {
    this.circ.radius = event.target.valueAsNumber;
    this.updatedCircle.emit(this.circ);
    //console.log("Change in width");
    //console.log(this.rect);
  }

  selectColour(event:any) : void
  {
      console.log(event);
      this.circ.colour =+ event;
      console.log("changing colour");
      console.log(this.circ);
      this.updatedCircle.emit(this.circ);
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
