import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';
import { SorterService } from '../core/sorter.service';

import { ITemplate, IRectangle, ICircle, IText, IImage, IUser } from '../shared/interfaces';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit 
{

	templates:any[]=[];
  user: IUser = {
    "name": "",
    "textType": [],
    "colours": [],
    "fonts": []
  };
	id:string = "";

  editing:boolean;
  creatingNew:boolean;

  selectedT:ITemplate = {
      "id": "",
      "customerId": "",
      "dateCreated":"",
      "name": "",
      "categories": [],
      "width": 0,
      "height": 0,
      "shapes":[],
      "rectangles": [],
      "circles": [],
      "texts": [],
      "images": []
    };

  /**
   * Constructor for this class - creating injectables and initializing global variables.
   * Subscribing to user Id and setting booleans to false
   *
   * @param dataService - injectable DataService
   * @param router - injectableRouter
   * @param auth - injectable AuthService
   * @returns void
   */
  constructor(private dataService:DataService,
              private router: Router,
              private auth: AuthService) 
  { 
  	this.auth.getId().subscribe((userId:string)=> (this.id = userId));
    this.editing = false;
    this.creatingNew = false;
    this.reset();
  }

  /**
   * Subscrbe to getting template and user on initialization
   *
   * @returns void
   */
  ngOnInit(): void 
  {

  	this.dataService.getTemplates(this.id)
            .subscribe((temps: ITemplate[]) => this.templates = temps);
    
    this.dataService.getUser(this.id)
            .subscribe((selectedUser: IUser) => this.user = selectedUser);
  }

  /**
   * Creating new template, so creatingNew and editing are both true
   *
   * @returns void
   */
  create(): void 
  {
    this.creatingNew = true;
  }

  /**
   * Editing a selected template, so editing is true.
   *
   * @param tempToEdit - the template the user wants to edit
   * @returns void
   */
  editFolder(tempToEdit: ITemplate) : void
  {
    this.selectedT = tempToEdit;
    console.log(this.selectedT);
    this.editing = true;
  }

  /**
   * Change selected template back to a new, blank template (so selected T can
   * be used for new template)
   *
   * @returns void
   */
  reset():void
  {
    this.selectedT = {
      "id": "0",
      "customerId": this.id,
      "dateCreated":"2021-03-21",
      "name": "Untitled",
      "categories": [],
      "width": 0,
      "height": 0,
      "shapes":[],
      "rectangles": [],
      "circles": [],
      "texts": [],
      "images": []
    };
  }

  /**
   * The new template details are determined, so create the new template in the datbase, finish creating
   * and open the new template with editing.
   * 
   * @param done - true if finished creating; false if cancelled
   * @returns void
   */
   doneCreating(done: boolean) : void
   {
    if (done)
    {
      this.selectedT.id = this.dataService.addTemplate(this.id, this.selectedT.name, this.selectedT.categories, this.selectedT.width, this.selectedT.height);

      this.creatingNew = false;
      this.editing = true;
    }
    else
    {
      this.creatingNew = false;
    }
   }

  /**
   * Editing is finished, so based on message from child component, update accordingly.
   * If the message is 0, update a template. If the message 1, editing cancelled, so nothing happens. If message is 2, 
   * delete template.
   * 
   *
   * @returns void
   */
  doneEditing(update: number) : void
  {
    if (update===0)
    {
      this.dataService.changeTemplate(this.selectedT);
    }
    else if (update===2)
    {
      this.dataService.deleteTemplate(this.selectedT.id);
    }

    this.editing = false;
    this.reset();
  }

}
