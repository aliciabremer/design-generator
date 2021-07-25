import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { IRectangle } from '../../../shared/interfaces';
import { EditTempService } from '../../../core/edit-temp.service';
 

@Component({
  selector: 'app-edit-rect',
  templateUrl: './edit-rect.component.html',
  styleUrls: ['./edit-rect.component.css']
})
export class EditRectComponent
{

  //take the rectangle as input
	private _rect: IRectangle = {
		"id":0,
		"x":0,
		"y":0,
		"width":0,
		"height":0,
    "colour":0
	};

  /**
   * Take the rectangle from parent component and assign it to _rectangle
   * 
   * @param value - the rectangle to edit
   * @returns void
   */
  @Input('rect')
  set rect(value: IRectangle) 
  {
    if (value)
    {
      this._rect = value;
    }
  }

  /**
   * Get the rectangle to edit.
   * 
   * @returns the rectangle to edit
   */
  get rect(): IRectangle {
    return this._rect;
  }

  //EventEmitter to output updated rectangle to parent
  @Output() rectChange = new EventEmitter<IRectangle>();

  //the list of the order of shapes
  private _shapes: number[][] = [];

  /**
   * Take the order of shapes from parent component and assign it to _shapes
   * 
   * @param value - the list of the order of shapes
   * @returns void
   */
  @Input('shapes')
  set shapes(value: number[][]) 
  {
    if (value)
    {
      this._shapes = value;
    }
    
  }

  /**
   * Get the shape order to edit.
   * 
   * @returns the list of the order of shapes
   */
  get shapes(): number[][] 
  {
    return this._shapes;
  }

  //EventEmitter to output updated shapes to parent
  @Output() shapesChange = new EventEmitter<number[][]>();

  //the user colour options as grayscale
  private _colours: string[] = [];
  
  /**
   * Take the colour options from parent component and assign it to _colours
   * 
   * @param value - the list of colours in gray scale
   * @returns void
   */
  @Input('colours')
  set colours(value: string[])
  {
    if (value)
    {
      this._colours = value;
    }
  }

  /**
   * Get the list of colours of the user.
   * 
   * @returns the list of colours in gray scale
   */
  get colours(): string[]
  {
    return this._colours;
  }

  //the width of canvas as input
  private _width:number = 0;

  /**
   * Take the width of the cavnas from parent component and assign it to _width
   * 
   * @param value - the width of the canvas
   * @returns void
   */
  @Input('width')
  set width(value: number)
  {
    if (value)
    {
      this._width = value;
    }
  }

  /**
   * Get the width of the canvas
   * 
   * @returns the width
   */
  get width(): number
  {
    return this._width;
  }

  //the height of the canvas as input
  private _height:number = 0;

  /**
   * Take the height of the cavnas from parent component and assign it to _height
   * 
   * @param value - the height of the canvas
   * @returns void
   */
  @Input('height')
  set height(value: number)
  {
    if (value)
    {
      this._height = value;
    }
  }

  /**
   * Get the height of the canvas
   * 
   * @returns the height
   */
  get height(): number
  {
    return this._height;
  }

  //output false when no longer editing
  @Output() editing = new EventEmitter<boolean>();

  //output true if rectangle is being deleted
  @Output() deleting = new EventEmitter<boolean>();
  
  /**
   * Constructor for this class - creating injectable
   *
   * @param editService - injectable EditTempService
   * @returns void
   */
  constructor(private editService: EditTempService) { }

  /**
   * Get the updated x position of the rectangle and send back updated rect.
   *
   * @param event - the range value inputted for the x position
   * @returns void
   */
  getXPos(event: any) : void
  {
    this.rect.x = event.target.valueAsNumber;
    this.rectChange.emit(this.rect);
    //console.log("Change in x");
    //console.log(this.rect);
  }

  /**
   * Get the updated y position of the rectangle and send back updated rect. 
   *
   * @param event - the range value inputted for the y position
   * @returns void
   */
  getYPos(event: any) : void
  {
    this.rect.y = event.target.valueAsNumber;
    this.rectChange.emit(this.rect);
    //console.log("Change in y");
    //console.log(this.rect);
  }

  /**
   * Get the updated width of the rectangle and send back updated rect. 
   *
   * @param event - the range value inputted for the width
   * @returns void
   */
  getXWidth(event: any) : void
  {
    this.rect.width = event.target.valueAsNumber;
    this.rectChange.emit(this.rect);
    //console.log("Change in width");
    //console.log(this.rect);
  }

  /**
   * Get the updated height of the rectangle and send back updated rect. 
   *
   * @param event - the range value inputted for the height
   * @returns void
   */
  getYHeight(event: any) : void
  {
    this.rect.height = event.target.valueAsNumber;
    this.rectChange.emit(this.rect);
    //console.log("Change in height");
    //console.log(this.rect);
  }

  /**
   * Get the selected colour for the rectangle and send back updated rect. 
   *
   * @param event - the inputted value for the colour
   * @returns void
   */
  selectColour(event:any) : void
  {
      console.log(event);
      this.rect.colour =+ event;
      console.log("changing colour");
      console.log(this.rect);
      this.rectChange.emit(this.rect);
  }

  /**
   * Move rectangle in the shapes to the top and send back updated shapes. 
   *
   * @returns void
   */
  sendToFront() : void
  {
    this.shapes = this.editService.sendToFront(this.shapes, this.rect.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the rectangle in the shapes to the bottom and send back updated shapes. 
   *
   * @returns void
   */
  sendToBack() : void
  {
    this.shapes = this.editService.sendToBack(this.shapes, this.rect.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the rectangle in shapes back one position and send back updated shapes. 
   *
   * @returns void
   */
  sendBackward() : void
  {
    this.shapes = this.editService.sendBackward(this.shapes, this.rect.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the rectangle in shapes up one position and send back updated shapes. 
   *
   * @returns void
   */
  sendForward() : void
  {
    this.shapes = this.editService.sendForward(this.shapes, this.rect.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Allows objects to be tracked by their index in ngFor
   *
   * @param indexOfElement - the index of the element
   * @param obj - the object
   * @returns the index of the element
   */
  trackByIndex(indexOfElement: number, obj: any):any 
  {
    return indexOfElement;
  }

  /**
   * Done editing, so emit false for still editing. 
   *
   * @returns void
   */
  finished() : void
  {
  	this.editing.emit(false);
  }

  /**
   * Delete the shape, so emit true from deleting and call method finished
   *
   * @returns void
   */
  delete() : void
  {
    this.deleting.emit(true);
    this.finished();
  }

}
