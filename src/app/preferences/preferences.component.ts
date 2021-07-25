import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';
import { IUser, IText } from '../shared/interfaces';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  user:any;
  id:string = "";

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
  }

  /**
   * Subscribe to the user indicated by the id.
   *
   * @returns void
   */
  ngOnInit(): void 
  {
  	this.dataService.getUser(this.id)
            .subscribe((selectedUser: IUser) => this.user = selectedUser);
    console.log(this.user);

  }

}
