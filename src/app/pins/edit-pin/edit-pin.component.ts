import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-pin',
  templateUrl: './edit-pin.component.html',
  styleUrls: ['./edit-pin.component.css']
})
export class EditPinComponent
{

  //two way binding for all variables

  //the text types the users use for their pins
  private _textTypes:string[] = [];

  /**
   * Take the types of text from parent component and assign it to _textTypes
   * 
   * @param value - the list of types of text the user wants
   * @returns void
   */
  @Input('textTypes')
  set textTypes(value: string[]) 
  {
    if (value)
    {
      console.log("text types");
      console.log(value);
      this._textTypes = value;
    }
  }
 
  /**
   * Get the type of text list of the user.
   * 
   * @returns the list of text types
   */
  get textTypes(): string[] 
  {
    return this._textTypes;
  }

  
  //the name of the folder
  private _fName:string = "";

  /**
   * Take the value for the folder name from parent component and assign it to _fName
   * 
   * @param value - the name of the folder
   * @returns void
   */
  @Input('fName')
  set fName(value: string) 
  {
    if (value)
    {
      this._fName = value;
    }
  }
 
  /**
   * Get the name of the folder
   * 
   * @returns the name of the folder
   */
  get fName(): string 
  {
    return this._fName;
  }

  //EventEmitter to output new name to parent
  @Output() fNameChange = new EventEmitter<string>();


  //the categories of the folder
  private _fCategories:string[] = [];

  /**
   * Take the categories of the folder from parent component and assign it to _fCategories
   * 
   * @param value - the list of categories
   * @returns void
   */
  @Input('fCategories')
  set fCategories(value: string[]) 
  {
    if (value)
    {
      this._fCategories = value;
    }
  }
 
  /**
   * Get the list of categories of the folder
   * 
   * @returns the list of categories of the folder
   */
  get fCategories(): string[] 
  {
    return this._fCategories;
  }

  //EventEmitter to output new categories to parent
  @Output() fCategoriesChange = new EventEmitter<string[]>();


  //the categories of the folder
  private _fText:string[][] = [];

  /**
   * Take the list of the text from parent component and assign it to _fText
   * 
   * @param value - the list of texts of each type
   * @returns void
   */
  @Input('fText')
  set fText(value: string[][]) 
  {
    if (value)
    {
      console.log("text");
      console.log(value);
      this._fText = value;
    }
  }
 
  /**
   * Get the list of the text of each type of the folder
   * 
   * @returns the list of the text of each type
   */
  get fText(): string[][] 
  {
    return this._fText;
  }

  //EventEmitter to output new text lists to parent
  @Output() fTextChange = new EventEmitter<string[][]>();

  //the images of the folder
  private _fImages:string[] = [];

  /**
   * Take the image path list from parent component and assign it to _fImages
   * 
   * @param value - the list of image paths
   * @returns void
   */
  @Input('fImages')
  set fImages(value: string[]) 
  {
    if (value)
    {
      this._fImages = value;
    }
  }
 
  /**
   * Get the list of image paths of the folder
   * 
   * @returns the list of image paths of the folder
   */
  get fImages(): string[] 
  {
    return this._fImages;
  }

  //EventEmitter to output new images to parent
  @Output() fImagesChange = new EventEmitter<string[]>();

  //output for when done editing: 0 to update, 1 to cancel, 2 to delete
  @Output() updateAndDone = new EventEmitter<number>();

  //true if user wants to delete folder
  deleting:boolean = false;

  /**
   * Send all new values back to the parent.
   *
   * @returns void
   */
  changePreferences():void 
  {
  	this.fTextChange.emit(this.fText);
    this.fImagesChange.emit(this.fImages);
    this.fCategoriesChange.emit(this.fCategories);
    this.fNameChange.emit(this.fName);
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
   * Adds a new category to fCategories, as an empty string
   *
   * @returns void
   */
  addCategory():void
  {
    console.log(this.textTypes);

  	this.fCategories.push("");
  }

  /**
   * Removes the specific category represented by index from the list
   * of categories
   *
   * @param index - the position of the category to remove
   * @returns void
   */
  removeCategory(index:number):void
  {
  	this.fCategories.splice(index, 1);
  }

  /**
   * Adds a new text of the text type inputted.
   *
   * @param textType - the type of text to add
   * @returns void
   */
  addText(textType:number):void
  {
    console.log("adding Text")
    console.log(this.fText[textType]);
  	this.fText[textType].push("");
    console.log(this.fText[textType][0]);
  }

  /**
   * Removes the specific text of text type passed in that occurs at position
   * index in the list for that text type.
   *
   * @param textType - the type of text the text to remove is
   * @param index - the position of the category to remove
   * @returns void
   */
  removeText(textType:number, index:number):void
  {
  	this.fText[textType].splice(index, 1);
  }

  /**
   * Adds a new image file location to the list of images 
   *
   * @param src - the path to the image
   * @returns void
   */
  addImage(src:string):void
  {
  	this.fImages.push(src);
  }

  /**
   * Removes the image file specified from the list of image file paths.
   *
   * @param index - the position of the image path to remove
   * @returns void
   */
  removeImage(index:number):void
  {
    this.fImages.splice(index, 1);
  }

  /**
   * Done editing, so send back updated folder information and send message to update
   * or create folder in database (0)
   *
   * @returns void
   */
  done() : void
  {
    this.changePreferences();
    this.updateAndDone.emit(0);
  }

  /**
   * User chose to cancel, so don't send updated info and emit message to neither update
   * nor create folder in database (1)
   *
   * @returns void
   */
  cancel() : void
  {
    this.updateAndDone.emit(1);
  }

  /**
   * User wants to delete, so confirm user's choice by showing confirmation to delete
   *
   * @returns void
   */
  tryToDelete() : void
  {
    this.deleting = true;
  }

  /**
   * User does not want to delete, so change deleting back to false.
   *
   * @returns void
   */
  cancelDelete() : void
  {
    this.deleting = false;
  }

  /**
   * Send message to parent component to delete the folder (2)
   *
   * @returns void
   */
  delete() : void
  {
    this.updateAndDone.emit(2);
  }

}

//change how iamges are stored + fix images
