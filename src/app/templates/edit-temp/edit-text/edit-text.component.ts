import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IText } from '../../../shared/interfaces';
import { EditTempService } from '../../../core/edit-temp.service';

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.css']
})
export class EditTextComponent
{
  //the text to edit
	private _text: IText = {
		"id":0,
		"size":0,
		"type":0,
		"x":0,
		"y":0,
		"font":0,
    "colour":0,
    "maxWidth": 0,
    "height": 0
	};

  /**
   * Take the text from parent component and assign it to _text
   * 
   * @param value - the text to edit
   * @returns void
   */
  @Input('text')
  set text(value: IText) 
  {
    if (value)
    {
      this._text = value;
    }
  }
 
  /**
   * Get the text to edit.
   * 
   * @returns the text to edit
   */
  get text(): IText 
  {
    return this._text;
  }

  //EventEmitter to output updated text to parent
  @Output() textChange = new EventEmitter<IText>();

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

  //the list of user text types
  private _textTypes: string[] = [];

  /**
   * Take the text types of the user from parent component and assign it to _textTypes
   * 
   * @param value - the list of text types
   * @returns void
   */
  @Input('textTypes')
  set textTypes(value: string[])
  {
    if (value)
    {
      this._textTypes = value;
    }
  }

  /**
   * Get the text types of the user
   * 
   * @returns the list of text types
   */
  get textTypes(): string[]
  {
    return this._textTypes;
  }

  //the list of user fonts
  private _fonts: string[] = [];

  /**
   * Take the fonts of the user from parent component and assign it to _fonts
   * 
   * @param value - the list of the fonts
   * @returns void
   */
  @Input('fonts')
  set fonts(value: string[])
  {
    if (value)
    {
      this._fonts = value;
    }
  }

  /**
   * Get the fonts of the user
   * 
   * @returns the list of fonts
   */
  get fonts(): string[]
  {
    return this._fonts;
  }

  //output false when no longer editing
  @Output() editing = new EventEmitter<boolean>();

  //output true if text is being deleted
  @Output() deleting = new EventEmitter<boolean>();
 

  /**
   * Constructor for this class - creating injectable
   *
   * @param editService - injectable EditTempService
   * @returns void
   */
  constructor(private editService: EditTempService) { }

  /**
   * Get the updated x position of the text and send back updated text.
   *
   * @param event - the range value inputted for the x position
   * @returns void
   */
  getXPos(event: any) : void
  {
    this.text.x = event.target.valueAsNumber;
    this.textChange.emit(this.text);
    //console.log("colours " + this.colours);
    //console.log("Change in x");
    //console.log(this.rect);
  }

  /**
   * Get the updated y position of the text and send back updated text. 
   *
   * @param event - the range value inputted for the y position
   * @returns void
   */
  getYPos(event: any) : void
  {
    this.text.y = event.target.valueAsNumber;
    this.textChange.emit(this.text);
    //console.log("Change in y");
    //console.log(this.rect);
  }

  /**
   * Get the updated width of the text and send back updated text. 
   *
   * @param event - the range value inputted for the width
   * @returns void
   */
  getXWidth(event: any) : void
  {
    this.text.maxWidth = event.target.valueAsNumber;
    this.textChange.emit(this.text);
    //console.log("Change in width");
    //console.log(this.rect);
  }

  /**
   * Get the updated height of the text and send back updated text. 
   *
   * @param event - the range value inputted for the height
   * @returns void
   */
  getYHeight(event: any) : void
  {
    this.text.height = event.target.valueAsNumber;
    this.textChange.emit(this.text);
    //console.log("Change in height");
    //console.log(this.rect);
  }

  getFontSize(event:any):void
  {
    this.text.size = event.target.valueAsNumber;
    this.textChange.emit(this.text);
  }

  /**
   * Get the selected colour for the text and send back updated text. 
   *
   * @param event - the inputted value for the colour
   * @returns void
   */
  selectColour(event:any) : void
  {
      console.log(event);
      this.text.colour =+ event;
      console.log("changing colour");
      console.log(this.text);
      this.textChange.emit(this.text);
  }

  /**
   * Get the selected type for the text and send back updated text. 
   *
   * @param event - the inputted value for the type
   * @returns void
   */
  selectType(event:any) : void
  {
      console.log(event);
      this.text.type =+ event;
      console.log("changing text type");
      console.log(this.text);
      this.textChange.emit(this.text);
  }

  /**
   * Get the selected colour for the text and send back updated text. 
   *
   * @param event - the inputted value for the colour
   * @returns void
   */
  selectFont(event:any) : void
  {
      console.log(event);
      this.text.font =+ event;
      console.log("changing text font");
      console.log(this.text);
      this.textChange.emit(this.text);
  }

/**
   * Move text in the shapes to the top and send back updated shapes. 
   *
   * @returns void
   */
  sendToFront() : void
  {
    this.shapes = this.editService.sendToFront(this.shapes, this.text.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the text in the shapes to the bottom and send back updated shapes. 
   *
   * @returns void
   */
  sendToBack() : void
  {
    this.shapes = this.editService.sendToBack(this.shapes, this.text.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the text in shapes back one position and send back updated shapes. 
   *
   * @returns void
   */
  sendBackward() : void
  {
    this.shapes = this.editService.sendBackward(this.shapes, this.text.id-1);
    console.log(this.shapes);
    this.shapesChange.emit(this.shapes);
  }

  /**
   * Move the text in shapes up one position and send back updated shapes. 
   *
   * @returns void
   */
  sendForward() : void
  {
    this.shapes = this.editService.sendForward(this.shapes, this.text.id-1);
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
  delete()
  {
    this.deleting.emit(true);
    this.finished();
  }


}
