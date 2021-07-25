import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';
import { IPinFolder, IUser } from '../shared/interfaces';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {

  f:any[] = [];
  user: IUser = {
    "name": "",
    "textType": [],
    "colours": [],
    "fonts": []
  };
  
  id:string = "";
  
  editing:boolean;
  creatingNew:boolean;

  selectedF:IPinFolder = {
      "id": "",
      "customerId": "",
      "name": "",
      "dateCreated": "",
      "dateLastUsed": "",
      "categories": [],
      "text": [[]],
      "image": []
    };

  /**
   * Constructor for this class - creating injectables and initializing global variables
   *
   * @param dataService - injectable DataService
   * @param authService - injectable AuthService
   * @returns void
   */
  constructor(private dataService: DataService,
              private authService: AuthService) 
  { 
  	this.authService.getId().subscribe((userId:string)=> (this.id = userId));
    this.editing = false;
    this.creatingNew = false;
    this.resetFolder();
    console.log(this.id);
  }

  /**
   * Subscribes to getting folders and user information for logged in user.
   *
   * @returns void
   */
  ngOnInit(): void 
  {

  	this.dataService.getFolders(this.id)
            .subscribe((folders: IPinFolder[]) => this.f = folders);

    this.dataService.getUser(this.id)
            .subscribe((selectedUser: IUser) => this.user = selectedUser);

    console.log(this.user);
  }

  /**
   * Creating new folder, so creatingNew and editing are both true
   *
   * @returns void
   */
  create(): void 
  {
    this.resetFolder();
    this.creatingNew = true;
    this.editing = true;
  }

  /**
   * Editing a selected folder, so editing is true.
   *
   * @param folderToEdit - the folder the user wants to edit
   * @returns void
   */
  editFolder(folderToEdit: IPinFolder) : void
  {
    this.selectedF = folderToEdit;
    this.editing = true;
  }

  /**
   * Change selected folder back to a new, blank folder (so selectedF) can
   * be used for new folder
   *
   * @returns void
   */
  resetFolder() : void
  {
    var tempList:string[][] = [];


    console.log("length of text type");
    console.log(this.user);
    console.log(this.user.textType.length);
    for (let i = 0; i < this.user.textType.length; i ++)
    {
      tempList[i] = [];
      tempList[i][0] = this.user.textType[i];
      console.log(tempList[i][0]);
    }

    console.log("list of texts in reset");
    console.log(tempList);

    this.selectedF = {
      "id": "temp",
      "customerId": "temp",
      "name": "",
      "dateCreated": "temp",
      "dateLastUsed": "temp",
      "categories": [],
      "text": tempList,
      "image": []
    };
  }

  /**
   * Editing is finished, so based on message from child component, update accordingly.
   * If the message is 0, either create a folder or update a folder, depending on whether it is
   * a new folder. If the message 1, editing cancelled, so nothing happens. If message is 2, 
   * delete folder.
   * 
   *
   * @returns void
   */
  doneEditing(update: number) : void
  {
    if (update===0 && this.creatingNew)
    {
      this.dataService.addFolder(this.id, this.selectedF.name, this.selectedF.categories, this.selectedF.text, this.selectedF.image);
    }
    else if (update===0)
    {
      this.dataService.changeFolder(this.selectedF);
    }
    else if (update===2)
    {
      this.dataService.deleteFolder(this.selectedF.id);
    }

    this.creatingNew = false;
    this.editing = false;
    this.resetFolder();
  }
}
