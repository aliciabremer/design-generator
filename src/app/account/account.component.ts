import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';
import { IUser } from '../shared/interfaces'
 
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	id:string = "";
	user:any;

  /**
   * Constructor for this class - creating injectables and getting
   * the authentication token for the user
   *
   * @param auth - injectable AuthService
   * @returns void
   */
  constructor(private auth:AuthService,
              private dataService:DataService) 
  { 
  	this.auth.getId().subscribe((userId:string)=> (this.id = userId));
  }

  /**
   * Get the user's information on initialization
   *
   * @returns void
   */
  ngOnInit(): void 
  {
  	this.dataService.getUser(this.id)
            .subscribe((inpUser: IUser) => this.user = inpUser);
  }

}
