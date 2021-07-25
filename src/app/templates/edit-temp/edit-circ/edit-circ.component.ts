import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICircle } from '../../../shared/interfaces';
import { EditTempService } from '../../../core/edit-temp.service';

@Component({
  selector: 'app-edit-circ',
  templateUrl: './edit-circ.component.html',
  styleUrls: ['./edit-circ.component.css']
})
export class EditCircComponent {

  //the circle to edit
	private _circ: ICircle = {
    "id":0,
    "xPos":0,
    "yPos":0,
    "radius":0,
    "colour":0
  };
  
 /**
   * Take the circle from parent component and assign it to _circle
   * 
   * @param value - the circle to edit
   * @returns void
   */
  @Input('circ')
  set circ(value: ICircle) 
  {
    if (value)
    {
      this._circ = value;
    }
  }

  /**
   * Get the circle to edit.
   * 
   * @returns the circle to edit
   */
  get circ(): ICircle {
    return this._circ;
  }

  //EventEmitter to output updated circle to parent
  @Output() circChange = new EventEmitter<ICircle>();

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

  //output true if circle is being deleted
  @Output() deleting = new EventEmitter<boolean>();

  /**
   * Constructor for this class - creating injectable
   *
   * @param editService - injectable EditTempService
   * @returns void
   */
  constructor(private editService: EditTempService) { }

  /**
   * Get the updated x position of the circle and send back updated circ. 
   *
   * @param event - the range value inputted for the x position
   * @returns void
   */
  getXPos(event: any) : void
  {
    this.circ.xPos = event.target.valueAsNumber;
    this.circChange.emit(this.circ);
    //console.log("colours " + this.colours);
    //console.log("Change in x");
    //console.log(this.rect);
  }

  /**
   * Get the updated y position of the circle and send back updated circ. 
   *
   * @param event - the range value inputted for the y position
   * @returns void
   */
  getYPos(event: any) : void
  {
    this.circ.yPos = event.target.valueAsNumber;
    this.circChange.emit(this.circ);
    //console.log("Change in y");
    //console.log(this.rect);
  }


  /**
   * Get the updated radius of the circle and send back updated circ. 
   *
   * @param event - the range value inputted for the radius
   * @returns void
   */
  getRadius(event: any) : void
  {
    this.circ.radius = event.target.valueAsNumber;
    this.circChange.emit(this.circ);
    //console.log("Change in width");
    //console.log(this.rect);
  }

  /**
   * Get the selected colour for the circle and send back updated circle. 
   *
   * @param event - the inputted value for the colour
   * @returns void
   */
  selectColour(event:any) : void
  {
      console.log(event);
      this.circ.colour =+ event;
      console.log("changing colour");
      console.log(this.circ);
      this.circChange.emit(this.circ);
  }

  /**
   * Move circle in the shapes to the top and send back updated shapes. 
   *
   * @returns void
   */
  sendToFront() : void
  {
    this.shapes = this.editService.sendToFront(this.shapes, this.circ.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the circle in the shapes to the bottom and send back updated shapes. 
   *
   * @returns void
   */
  sendToBack() : void
  {
    this.shapes = this.editService.sendToBack(this.shapes, this.circ.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the circle in shapes back one position and send back updated shapes. 
   *
   * @returns void
   */
  sendBackward() : void
  {
    this.shapes = this.editService.sendBackward(this.shapes, this.circ.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the circle in shapes up one position and send back updated shapes. 
   *
   * @returns void
   */
  sendForward() : void
  {
    this.shapes = this.editService.sendForward(this.shapes, this.circ.id-1);
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
  finished()
  {
    this.editing.emit(false);
  }

  /**
   * Delete the shape, so emit true from deleting and call method finished
   *
   * @returns void
   */
  delete()
  {
    this.deleting.emit(true);
    this.finished();
  }

}
