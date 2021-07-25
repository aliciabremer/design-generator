import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IPinFolder } from '../../shared/interfaces';
import { SorterService } from '../../core/sorter.service';

@Component({
  selector: 'app-pins-list',
  templateUrl: './pins-list.component.html',
  styleUrls: ['./pins-list.component.css']
})
export class PinsListComponent
{

  //output the selected folder to edit to the parent component
  @Output() selectFolder = new EventEmitter<IPinFolder>();

  //take in the folders of the user as data
  private _folders: IPinFolder[] = [];

  /**
   * Take the list of folders from parent component and assign it to _folders
   * and the list of fileterd folders.
   * 
   * @param value - the list of folders of the user
   * @returns void
   */
  @Input('folders')
  set folders(value: IPinFolder[]) 
  {
    if (value) 
    {
      this.filteredFolders = this._folders = value;
    }
  }

  /**
   * Get the list of folders of the user.
   * 
   * @returns the list of folders
   */
  get folders(): IPinFolder[] 
  {
    return this._folders;
  }

  //the filtered list of folders
  filteredFolders: any[] = [];

  //the options for the number of folders per page
  pageOptions:number[] = [5, 10, 25, 50];

  //folders per page
  numPerPage:number;

  //page number
  page:number = 1;

  /**
   * Constructor for this class - injects the SorterService
   *
   * @param sorterService - injectable SorterService
   * @returns void
   */
  constructor(private sorterService: SorterService) 
  { 
    this.numPerPage = 5; //default per page is 5
    this.page = 1; //default page is 1
  }

  /**
   * Moves the page forward or backward by the specified amount, so long as the change leaves 
   * the page in the range so that the page is greater than 0 and no greater than the required
   * pages to display all the filtered folders.
   *
   * @param change - the amount to change the page by
   * @returns void
   */
  changePage(change:number) : void
  {
    let newPage:number = this.page + change;

    if (change == -2)
    {
      this.page = 1;
    }
    else if (change == 2)
    {
      this.page = Math.floor(this.filteredFolders.length / this.numPerPage+0.5);
    }
    else if (newPage > 0 && newPage <= Math.floor(this.filteredFolders.length / this.numPerPage+0.5))
    {
      this.page = newPage;
    }
  }

  /**
   * Checks if a folder index is within the current range of the page
   * 
   * @param index - the folder list location to check
   * @returns true if folder can be shown; false otherwise
   */
  validFolder(index:number):boolean
  {
    return index > (this.page-1)*this.numPerPage && index < this.page*this.numPerPage;
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
   * Emits the folder the user selected to the parent component.
   *
   * @param index - the index of the folder to select
   * @returns void
   */
  sendFolder(index : number) : void
  {
    this.selectFolder.emit(this.filteredFolders[index]);
  }

  /**
   * Filters the data based on the user input.  The folders are filtered based on
   * whether the user input is present in the folder's name, data created, date last used
   * or categories.
   *
   * @param data - the user's input for filtering the folders
   * @returns void
   */
  filter(data: string) : void
  {  	
    if (data) 
    {
      this.filteredFolders = this.folders.filter((f: IPinFolder) => {
          return f.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                 f.dateCreated.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                 f.dateLastUsed.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                 f.categories.toString().toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } 
    else
    {
      this.filteredFolders = this.folders;
    }
  }

  /**
   * Sorts the folders based on the value passed in. The SorterService is called to
   * sort the folders by prop.
   *
   * @param prop - the key to sort the folders by
   * @returns void
   */
  sort(prop: string) : void
  {
  		console.log("sorting");
      this.sorterService.sort(this.filteredFolders, prop);
    }

}
