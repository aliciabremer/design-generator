import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';

import { IPinFolder, ITemplate, IUser } from '../../shared/interfaces';
import { DrawService } from '../../core/draw.service';

@Component({
  selector: 'app-get-designs',
  templateUrl: './get-designs.component.html',
  styleUrls: ['./get-designs.component.css']
})
export class GetDesignsComponent implements OnInit {

	//the list of folders
  private _folders: IPinFolder[] = [];

  /**
   * Take the selected folders list from parent component and assign it to _folders
   * 
   * @param value - the list of selected folders of the user
   * @returns void
   */
  @Input('folders')
  set folders(value: IPinFolder[]) 
  {
    if (value) 
    {
      //console.log("getting designs folder list" + value);
      this._folders = value;
    }
  }

  /**
   * Get the folders list
   * 
   * @returns the list of selected folders
   */
  get folders(): IPinFolder[] 
  {
    return this._folders;
  }

  //the list of templates
  private _templates: ITemplate[] = [];
	
  /**
   * Take the selected templates list from parent component and assign it to _templates
   * 
   * @param value - the list of selected templates of the user
   * @returns void
   */
  @Input('templates')
  set templates(value: ITemplate[]) 
  {
    if (value) 
    {
      this._templates = value;
    }
  }

  /**
   * Get the templates list
   * 
   * @returns the list of selected templates
   */
  get templates(): ITemplate[] 
  {
     return this._templates;
  }

  //the number of designs to generate
  private _num: number = 0;

  /**
   * Take the number of designs to generate from parent component and assign it to _num
   * 
   * @param value - the number of designs to generate
   * @returns void
   */
  @Input()
  set num(value: number) 
  {
    if (value) 
    {
      this._num = value;
    }
  }

  /**
   * Get the number of designs to generate
   * 
   * @returns the number of designs to create
   */
  get num(): number 
  {
    return this._num;
  }

  //user data
  private _user: IUser = {
    "name":"",
    "textType":[],
    "colours":[],
    "fonts":[],
  };

  /**
   * Take the user information from parent component and assign it to _user
   * 
   * @param value - the user
   * @returns void
   */
  @Input('user')
  set user(value: IUser) 
  {
    if (value)
    {
      console.log("getting user");
      this._user = value;
    }
  }
 
  /**
   * Get the user information
   * 
   * @returns the user
   */
  get user(): IUser
  {
    return this._user;
  }

  //an array of indexes of folders and templates
  numbers:number[][];

  /**
   * Constructor for this class - creating global variables
   *
   * @returns void
   */
  constructor() 
  { 
    this.numbers = [[]];
    //console.log(this.folders);
    //console.log(this.templates);
    
  }

  /**
   * Initialize the 2d array of array and template indices for each design
   * to be generate
   *
   * @returns void
   */
  ngOnInit(): void 
  {
  	//create random pairing of templates and folders [options: ]
    //console.log(this.folders);
    //console.log(this.templates);
    for (let i: number = 0; i < this.num; i++) {
            this.numbers[i] = [];
            this.numbers[i][0] = Math.floor(Math.random()*this.folders.length);
            this.numbers[i][1] = Math.floor(Math.random()*this.templates.length);
        }
    //console.log(this.num);
    //console.log(this.numbers);
  }

}
