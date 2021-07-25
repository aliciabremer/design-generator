import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ITemplate } from '../../shared/interfaces';
import { SorterService } from '../../core/sorter.service';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css']
})
export class TemplatesListComponent
{

  //output the selected template to edit to the parent component
  @Output() selectTemplate = new EventEmitter<ITemplate>();

  //list of templates of the user
	private _templates: ITemplate[] = [];

  /**
   * Take the list of templates from parent component and assign it to _templates
   * 
   * @param value - the list of templates of the user
   * @returns void
   */
  @Input('templates') 
  set templates(value: ITemplate[])
  {
    if (value)
    {
        this.filteredTemplates = this._templates = value;
    }
  }

  /**
   * Get the list of templates of the user.
   * 
   * @returns the list of templates
   */
  get templates(): ITemplate[] 
  {
    return this._templates;
  }

  //the filtered list of folders
	filteredTemplates: any[] = [];

  //the options for the number of folders per page
  pageOptions:number[] = [5, 10, 25, 50];

  //folders per page
  numPerPage:number;

  //page number
  page:number = 1;

  constructor(private sorterService:SorterService) 
  { 
    this.numPerPage = 5; //default per page is 5
    this.page = 1; //default page is 1
  }

  /**
   * Emits the template the user selected to the parent component.
   *
   * @param t - the folder the user selected
   * @returns void
   */
  sendTemplate(t : ITemplate) : void
  {
    this.selectTemplate.emit(t);
  }

  /**
   * Moves the page forward or backward by the specified amount, so long as the change leaves 
   * the page in the range so that the page is greater than 0 and no greater than the required
   * pages to display all the filtered templates.
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
      this.page = Math.floor(this.filteredTemplates.length / this.numPerPage+0.5);
    }
    else if (newPage > 0 && newPage <= Math.floor(this.filteredTemplates.length / this.numPerPage+0.5))
    {
      this.page = newPage;
    }
  }

  /**
   * Filters the data based on the user input.  The templates are filtered based on
   * whether the user input is present in the template's name, data created, or categories.
   *
   * @param data - the user's input for filtering the folders
   * @returns void
   */
  filter(data: string) 
  {
    if (data) 
    {
      this.filteredTemplates = this.templates.filter((t: ITemplate) => {
            return t.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                   t.dateCreated.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                   t.categories.toString().toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } 
    else 
    {
      this.filteredTemplates = this.templates;
    }
  }

  /**
   * Sorts the templates based on the value passed in. The SorterService is called to
   * sort the templates by prop.
   *
   * @param prop - the key to sort the templates by
   * @returns void
   */
  sort(prop: string) 
  {
    console.log("sorting");
    this.sorterService.sort(this.filteredTemplates, prop);
  }
}
