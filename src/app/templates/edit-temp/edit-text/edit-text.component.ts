import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IText } from '../../../shared/interfaces';

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.css']
})
export class EditTextComponent implements OnInit {

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

  private _colours: string[] = [];
  private _width: number = 0;
  private _height: number = 0;
  private _textTypes: string[] = [];
  private _fonts: string[] = [];

    @Output() updatedText = new EventEmitter<IText>();
    @Output() editing = new EventEmitter<boolean>();
    @Output() deleting = new EventEmitter<boolean>();

  @Input('text')
  set text(text: IText) {
    this._text = text;
  }
 
  get text(): IText {
    return this._text;
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

  @Input('textTypes')
  set textTypes(textTypes: string[])
  {
    this._textTypes = textTypes;
  }

  get textTypes(): string[]
  {
    return this._textTypes;
  }

  @Input('fonts')
  set fonts(fonts: string[])
  {
    this._fonts = fonts;
  }

  get fonts(): string[]
  {
    return this._fonts;
  }
 

  constructor() { }

  ngOnInit(): void {
  }

  getXPos(event: any) : void
  {
    this.text.x = event.target.valueAsNumber;
    this.updatedText.emit(this.text);
    //console.log("colours " + this.colours);
    //console.log("Change in x");
    //console.log(this.rect);
  }

  getYPos(event: any) : void
  {
    this.text.y = event.target.valueAsNumber;
    this.updatedText.emit(this.text);
    //console.log("Change in y");
    //console.log(this.rect);
  }

  getXWidth(event: any) : void
  {
    this.text.maxWidth = event.target.valueAsNumber;
    this.updatedText.emit(this.text);
    //console.log("Change in width");
    //console.log(this.rect);
  }

  getYHeight(event: any) : void
  {
    this.text.height = event.target.valueAsNumber;
    this.updatedText.emit(this.text);
    //console.log("Change in height");
    //console.log(this.rect);
  }

  selectColour(event:any) : void
  {
      console.log(event);
      this.text.colour =+ event;
      console.log("changing colour");
      console.log(this.text);
      this.updatedText.emit(this.text);
  }

  selectType(event:any) : void
  {
      console.log(event);
      this.text.font =+ event;
      console.log("changing text type");
      console.log(this.text);
      this.updatedText.emit(this.text);
  }

  selectFont(event:any) : void
  {
      console.log(event);
      this.text.font =+ event;
      console.log("changing text font");
      console.log(this.text);
      this.updatedText.emit(this.text);
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
