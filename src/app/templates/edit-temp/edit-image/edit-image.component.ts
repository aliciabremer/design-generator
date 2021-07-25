import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IImage } from '../../../shared/interfaces';
import { EditTempService } from '../../../core/edit-temp.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent 
{
  //the image to edit
  private _img: IImage = {
  	"id":0,
	   "x":0,
	   "y":0,
     "width":500,
     "height":500
  };

  /**
   * Take the image from parent component and assign it to _image
   * 
   * @param value - the image to edit
   * @returns void
   */
  @Input('img')
  set img(value: IImage) 
  {
    if (value)
    {
      this._img = value;
    }
  }
 
  /**
   * Get the image to edit.
   * 
   * @returns the image to edit
   */
  get img(): IImage 
  {
    return this._img;
  }

  //EventEmitter to output updated image to parent
  @Output() imgChange = new EventEmitter<IImage>();

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

  //output true if image is being deleted
  @Output() deleting = new EventEmitter<boolean>();

  /**
   * Constructor for this class - creating injectable
   *
   * @param editService - injectable EditTempService
   * @returns void
   */
  constructor(private editService: EditTempService) { }

  /**
   * Get the updated x position of the image and send back updated image.
   *
   * @param event - the range value inputted for the x position
   * @returns void
   */
  getXPos(event: any) : void
  {
    this.img.x = event.target.valueAsNumber;
    this.imgChange.emit(this.img);
    //console.log("Change in x");
    //console.log(this.rect);
  }

  /**
   * Get the updated y position of the image and send back updated image. 
   *
   * @param event - the range value inputted for the y position
   * @returns void
   */
  getYPos(event: any) : void
  {
    this.img.y = event.target.valueAsNumber;
    this.imgChange.emit(this.img);
    //console.log("Change in y");
    //console.log(this.rect);
  }

  /**
   * Get the updated width of the image and send back updated image. 
   *
   * @param event - the range value inputted for the width
   * @returns void
   */
  getXWidth(event: any) : void
  {
    this.img.width = event.target.valueAsNumber;
    this.imgChange.emit(this.img);
    //console.log("Change in width");
    //console.log(this.rect);
  }

  /**
   * Get the updated height of the image and send back updated image. 
   *
   * @param event - the range value inputted for the height
   * @returns void
   */
  getYHeight(event: any) : void
  {
    this.img.height = event.target.valueAsNumber;
    this.imgChange.emit(this.img);
    //console.log("Change in height");
    //console.log(this.rect);
  }

/**
   * Move image in the shapes to the top and send back updated shapes. 
   *
   * @returns void
   */
  sendToFront() : void
  {
    this.shapes = this.editService.sendToFront(this.shapes, this.img.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the image in the shapes to the bottom and send back updated shapes. 
   *
   * @returns void
   */
  sendToBack() : void
  {
    this.shapes = this.editService.sendToBack(this.shapes, this.img.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the image in shapes back one position and send back updated shapes. 
   *
   * @returns void
   */
  sendBackward() : void
  {
    this.shapes = this.editService.sendBackward(this.shapes, this.img.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the image in shapes up one position and send back updated shapes. 
   *
   * @returns void
   */
  sendForward() : void
  {
    this.shapes = this.editService.sendForward(this.shapes, this.img.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
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
  delete()
  {
    this.deleting.emit(true);
    this.finished();
  }
}
