import { Component, Input,EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-temp',
  templateUrl: './create-temp.component.html',
  styleUrls: ['./create-temp.component.css']
})
export class CreateTempComponent
{

  //the name of the template
  private _tName:string = "";

  /**
   * Take the value for tempName from parent component and assign it to _tempName
   * 
   * @param value - the name of the template
   * @returns void
   */
  @Input('tName')
  set tName(value: string) 
  {
    if (value)
    {
      this._tName = value;
    }
  }
 
  /**
   * Get the name of the template
   * 
   * @returns the name of the template
   */
  get tName(): string 
  {
    return this._tName;
  }

  //EventEmitter to output new name to parent
  @Output() tNameChange = new EventEmitter<string>(); 

  //the categories of the template
  private _tCategories:string[] = [];

  /**
   * Take the value for tempName from parent component and assign it to tempName
   * 
   * @param value - the name of the template
   * @returns void
   */
  @Input('tCategories')
  set tCategories(value: string[]) 
  {
    if (value)
    {
      this._tCategories = value;
    }
  }
 
  /**
   * Get the list of categories of the template
   * 
   * @returns the list of categories of the template
   */
  get tCategories(): string[] {
    return this._tCategories;
  }

  //EventEmitter to output new categories to parent
  @Output() tCategoriesChange = new EventEmitter<string[]>();


  //the width of the template
  private _tWidth:number = 0;

  /**
   * Take the value for template width from parent component and assign it to _tWidth
   * 
   * @param value - the width of the template
   * @returns void
   */
  @Input('tWidth')
  set tWidth(value: number) 
  {
    if (value)
    {
      this._tWidth = value;
    }
  }

  /**
   * Get the width of the template
   * 
   * @returns the width of the template
   */
  get tWidth(): number 
  {
    return this._tWidth;
  }

  //EventEmitter to output new width to parent
  @Output() tWidthChange = new EventEmitter<number>();


  //the height of the template
  private _tHeight:number = 0;

  /**
   * Take the value for template height from parent component and assign it to _tHeight
   * 
   * @param value - the height of the template
   * @returns void
   */
  @Input('tHeight')
  set tHeight(value: number) 
  {
    if (value)
    {
      this._tHeight = value;
    }
  }
 
  /**
   * Get the height of the template
   * 
   * @returns the height of the template
   */
  get tHeight(): number 
  {
    return this._tHeight;
  }

  //EventEmitter to output new height to parent
  @Output() tHeightChange = new EventEmitter<number>();

  //output for when done creating: 0 to create, 1 to cancel
  @Output() finished = new EventEmitter<boolean>();

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
   * Adds a new category to tempCategories, as an empty string
   *
   * @returns void
   */
  addCategory():void
  {
    this.tCategories.push("");
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
    this.tCategories.splice(index, 1);
  }

  /**
   * Send all new values back to the parent.
   *
   * @returns void
   */
  changePreferences():void 
  {
    this.tNameChange.emit(this.tName);
    this.tCategoriesChange.emit(this.tCategories);
    this.tWidthChange.emit(this.tWidth);
    this.tHeightChange.emit(this.tHeight);
  }

  /**
   * Done creating a new template, so send back updated folder information and send message to update
   * or create folder in database (0)
   *
   * @returns void
   */
  done() : void
  {
    this.changePreferences();
    this.finished.emit(true);
  }

  /**
   * User chose to cancel, so don't send updated info and emit message to neither update
   * nor create folder in database (1)
   *
   * @returns void
   */
  cancel() : void
  {
    this.finished.emit(false);
  }

}
