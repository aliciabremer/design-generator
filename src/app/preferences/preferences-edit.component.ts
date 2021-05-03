import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataService } from '../core/data.service';
import { IUser, IText } from '../shared/interfaces';

@Component({
  selector: 'app-preferences-edit',
  templateUrl: './preferences-edit.component.html',
  styleUrls: ['./preferences-edit.component.css']
})
export class PreferencesEditComponent implements OnInit {

  user:any;
  id:number;
  users:any[] = [];

  constructor(private dataService: DataService) { 
  	this.id = 1; //change
  }

  ngOnInit(): void {
  	this.dataService.getUser(this.id)
            .subscribe((selectedUser: IUser) => this.user = selectedUser);
    console.log(this.user);
	}

	changePreferences():void {
		console.log(this.user);
		this.dataService.changeUser(this.user);
		this.dataService.getUsers()
            .subscribe((selectedUsers: IUser[]) => this.users = selectedUsers);
    	console.log(this.users);

  }

   trackByIndex(indexOfElement: number, obj: any):any {
    return indexOfElement;
  }

  addColour(): void
  {
    this.user.colours.push("");
  }

  removeColour(index:number) : void
  {
    this.user.colours.splice(index, 1);
  }

  addTextType(): void
  {
    this.user.textType.push("");
  }

  removeTextType(index:number) : void
  {
    this.user.textType.splice(index, 1);
  }

  addFont(): void
  {
    this.user.fonts.push("");
  }

  removeFont(index:number) : void
  {
    this.user.fonts.splice(index, 1);
  }	

}
