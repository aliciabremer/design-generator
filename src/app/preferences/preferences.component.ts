import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/data.service';
import { IUser, IText } from '../shared/interfaces';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  user:any;
  users:any[] = [];
  id:number;

  constructor(private dataService: DataService) { 
  	this.id = 1; //change
  }

  ngOnInit(): void {
  	this.dataService.getUser(this.id)
            .subscribe((selectedUser: IUser) => this.user = selectedUser);
    console.log(this.user);

  }

}
