import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';
import { FontsService } from '../core/fonts.service';

import { IUser, IText } from '../shared/interfaces';

@Component({
  selector: 'app-preferences-edit',
  templateUrl: './preferences-edit.component.html',
  styleUrls: ['./preferences-edit.component.css']
})
export class PreferencesEditComponent implements OnInit {

  user: IUser = {
    "name": "",
    "textType": [],
    "colours": [],
    "fonts": []
  };
  
  id:string = "";

  fontsList:any[] = [];
  filteredFonts:any[] = [];

  constructor(private dataService: DataService,
              private authService: AuthService,
              private fontService: FontsService) 
  { 
  	this.authService.getId().subscribe((userId:string)=> (this.id = userId));
  }

  ngOnInit(): void 
  {
  	this.dataService.getUser(this.id)
            .subscribe((selectedUser: IUser) => this.user = selectedUser);
    console.log("editing preferences");
    console.log(this.user);

    this.fontService.availableFonts()
            .subscribe((fonts:string[]) => this.fontsList=this.filteredFonts=fonts);
	}

	changePreferences():void {
		console.log(this.user);
		this.dataService.changeUser(this.id, this.user);
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


  filter(data: string) : void
  {   
    if (data) 
    {
      this.filteredFonts = this.fontsList.filter((f: string) => {
          return f.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } 
    else
    {
      this.filteredFonts = this.fontsList;
    }
  }

}
