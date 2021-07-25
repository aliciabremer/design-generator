import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';

import { IPinFolder, ITemplate, IUser } from '../shared/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  /**
   * Global variables:
   * 
   * fol - the list of all folders
   * temps - the list of all templates
   * num - the number of designs to generate
   * id - the id of the user
   * selectedF - the folders selected
   * selectedT - teh templates selected
   * tempCategories - the list of all template categories
   * folderCategories - the list of all folder Categories
   * doGenerate - true if time to generate; false otherwise
   * selectAllT - true if selecting all templates; false otherwise
   * selectCategoryT - true if selecting templates by category; false otherwise
   * selectIndividualT - true if selecting templates individually; false otherwise
   * selectAllF - true if selecting all folders; false otherwise
   * selectCategoryF - true if selecting folders by category; false otherwise
   * selectIndividualF - true if selecting folders individually; false otherwise
   */

  fol:any[] = [];
  temps:any[] = [];
  num:number;

  user:IUser = {
    "name": "",
    "textType": [],
    "colours": [],
    "fonts": []
  };
  
  id:string = "";

  selectedF:any[] = [];
  selectedT:any[] = [];

  tempCategories:string[] = [];
  folderCategories:string[] = [];

  doGenerate: boolean;

  selectAllT:boolean;
  selectCategoryT:boolean;
  selectIndividualT:boolean;

  selectAllF:boolean;
  selectCategoryF:boolean;
  selectIndividualF:boolean;

  /**
   * Constructor injects services and subscribes/sets global variables
   *
   * @param dataService - the Injectable DataService
   * @param router - the Injectable Router
   * @param authService - the Injectable AuthService
   * @returns void
   */
  constructor(private dataService: DataService,
              private router: Router,
              private authService: AuthService) 
  {

  		this.authService.getId().subscribe((userId:string)=> (this.id = userId));
  		this.doGenerate = false;
  		this.num = 0;

      this.selectAllT = false;
      this.selectCategoryT = false;
      this.selectIndividualT = false;

      this.selectAllF = false;
      this.selectCategoryF = false;
      this.selectIndividualF = false;

    }

  /**
   * subscribes to the folders and templates of the user
   *
   * @returns void
   */
  ngOnInit(): void 
  {

  	this.dataService.getFolders(this.id)
            .subscribe((folders: IPinFolder[]) => this.fol = folders);
    //console.log("getting folders");
    //console.log(this.fol);

    this.dataService.getTemplates(this.id)
            .subscribe((t: ITemplate[]) => this.temps = t);
    //console.log(this.temps);

    this.dataService.getUser(this.id)
            .subscribe((selectedUser: IUser) => this.user = selectedUser);

  }

  /**
   * Select or deselect a single folder
   *
   * @param f - the folder to select/deselect
   * @param e - the event
   * @returns void
   */
  addFolder(f : IPinFolder, e:any) : void
  {
    if (e.target.checked)
    {
      this.selectedF.push(f);
    }
  	else
    {
      for (let i = this.selectedF.length-1; i > -1; i--)
      {
        if (f===this.selectedF[i])
        {
          this.selectedF.splice(i,1);
        }
      }
      //console.log("removing folder");
    }
  }

  /**
   * Select items in list individually
   *
   * @param e - the event
   * @returns void
   */
  changeIndividualFol(e:any):void
  {
    //console.log(e.target.checked);
    if (e.target.checked)
    {
      this.selectAllF = false;
      this.selectCategoryF=false;
      this.selectIndividualF=true;
      this.selectedF = [];
      //console.log("selected individual folders");
    }
    else
    {
      this.selectIndividualF=false;
      this.selectedF = [];
    }
    
  }
  
  /**
   * Select or deselect a single template
   *
   * @param t - the template to select/deselect
   * @param e - the event
   * @returns void
   */
  addTemplate(t : ITemplate, e: any) : void
  {
    if (e.target.checked)
    {
      this.selectedT.push(t);
    }
    else
    {
      for (let i = this.selectedT.length-1; i > -1; i--)
      {
        if (t===this.selectedT[i])
        {
          this.selectedT.splice(i,1);
        }
      }
      //console.log("removing template");
    }
  }

  /**
   * Create the list based on the individual templates
   *
   * @param e - the event
   * @returns void
   */
  changeIndividualTemp(e:any) : void
  {
    if (e.target.checked)
    {
      this.selectAllT = false;
      this.selectCategoryT=false;
      this.selectIndividualT=true;
      this.selectedT = [];
      //console.log("selected individual templates");
    }
    else
    {
      this.selectIndividualT=false;
      this.selectedT = [];
    }
    
  }

  /**
   * Select or deselect all folders
   *
   * @param e - the event
   * @returns void
   */
  changeAllFol(e:any):void
  {
    //console.log(e.target.checked);
    if (e.target.checked)
    {
    	this.selectAllF = true;
      this.selectCategoryF=false;
      this.selectIndividualF=false;
      this.selectedF = this.fol;
      //console.log("selected all templates");
    }
    else
    {
      this.selectAllF = false;
      this.selectedF = [];
    }
  }

  /**
   * Select or deselect all templates
   *
   * @param e - the event
   * @returns void
   */
  changeAllTemp(e:any) : void
  {
    if (e.target.checked)
    {
      this.selectAllT = true;
      this.selectCategoryT=false;
      this.selectIndividualT=false;
    	this.selectedT = this.temps;
      //console.log("selected all templates");
    }
    else
    {
      this.selectAllT = false;
      this.selectedT = [];
    }
  }

  /**
   * Get the categories of all of the templates.
   *
   * @returns void
   */
  getCategoriesTemp() : void
  {
    var arr:string[] = [];
    for (let i = 0; i < this.temps.length; i++)
    {
      for (let s of this.temps[i].categories)
      {
        arr.push(s);
      }
    }
    this.tempCategories = Array.from(new Set(arr));
    //console.log(this.tempCategories);
  }

  /**
   * Select or deselect based on the category
   *
   * @param e - the event
   * @returns void
   */
  changeCategoryTemp(e:any) : void
  {
    if (e.target.checked)
    {
      this.getCategoriesTemp();
      this.selectCategoryT = true;
      this.selectIndividualT=false;
      this.selectAllT = false;
      this.selectedT = [];
      //console.log("selecting by cateogry");
    }
    else
    {
      this.selectCategoryT = false;
      this.selectedT = [];
    }
    
  }

  /**
   * Select or deselect templates based on their category
   *
   * @param c - the category
   * @param e - the event
   * @returns void
   */
  addTempCategory(c:string, e: any) : void
  {
    if (e.target.checked)
    {
      for (let i = 0; i < this.temps.length; i++)
      {
        for (let s of this.temps[i].categories)
        {
          if (s===c)
          {
            this.selectedT.push(this.temps[i]);
            break;
          }
        }
      }
      this.selectedT = Array.from(new Set(this.selectedT));
      //console.log(this.selectedT);
    }
    else
    {
      for (let i = this.selectedT.length-1; i > -1; i--)
      {
        if (this.selectedT[i].categories[0] != null && c===this.selectedT[i].categories)
        {
          this.selectedT.splice(i,1);
        }
      }
      //console.log("remvoing cateogyr");
    }
  }

  /**
   * Get the categories of all of the folders.
   *
   * @returns void
   */
  getCategoriesFol() : void
  {
    var arr:string[] = [];
    for (let i = 0; i < this.fol.length; i++)
    {
      for (let s of this.fol[i].categories)
      {
        arr.push(s);
      }
    }
    this.folderCategories = Array.from(new Set(arr));
    //console.log(this.folderCategories);
  }

  /**
   * Select or deselect based on the category
   *
   * @param e - the event
   * @returns void
   */
  changeCategoryFol(e:any) : void
  {
    if (e.target.checked)
    {
      this.getCategoriesFol();
      this.selectCategoryF = true;
      this.selectIndividualF=false;
      this.selectAllF = false;
      this.selectedF = [];
      //console.log("selecting by cateogry");
    }
    else
    {
      this.selectCategoryF = false;
      this.selectedF = [];
    }
  }

  /**
   * Select or deselect folders based on their category
   *
   * @param c - the category
   * @param e - the event
   * @returns void
   */
  addFolCategory(c:string, e:any) : void
  {
    if (e.target.clicked)
    {
      for (let i = 0; i < this.fol.length; i++)
      {
        for (let s of this.fol[i].categories)
        {
          if (s===c)
          {
            this.selectedF.push(this.fol[i]);
            break;
          }
        }
      }
      this.selectedF = Array.from(new Set(this.selectedF));
      //console.log(this.selectedF);
    }
    else
    {
      for (let i = this.selectedF.length-1; i > -1; i--)
      {
        if (this.selectedF[i].categories[0] != null && c===this.selectedF[i].categories)
        {
          this.selectedF.splice(i,1);
        }
      }
    }
  }

  /**
   * Set generate to true.
   *
   * @returns void
   */
  generate() : void
  {
  	this.doGenerate = true;
  }

  /**
   * Set generate to false when done.
   *
   * @returns void
   */
  done() : void
  {
  	this.doGenerate = false;
  }


}
