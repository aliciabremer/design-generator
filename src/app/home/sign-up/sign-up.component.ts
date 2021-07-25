import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent
{

  userName:string = "";
  email:string = "";
  password:string = "";
  checkPassword:string ="";

  incorrect:boolean = false;
  success:boolean = false;

  /**
   * Constructor for this class - creating injectables and initializing global variables
   *
   * @param auth - injectable AuthService
   * @param router - injectable Router
   * @param dataService - injectable DataService
   * @returns void
   */
  constructor(private auth: AuthService,
  	private router: Router,
    private dataService: DataService) { }


  /**
   * Try to sign up a new user using their email and password. If successful, 
   * add the user to the database.
   *
   * @returns true if password is the same as check password; false otehrwise
   */
  onSubmit() : void
  {
  	this.success = this.auth.signUpWithEmail(this.email, this.password);

    if(this.success)
    {
      //console.log(this.email.substring(0, this.email.indexOf(".")));
      this.dataService.addUser(this.email.substring(0, this.email.indexOf(".")), this.userName);
    }
  }

  /**
   * Check if both passwords are the same.
   *
   * @returns true if password is the same as check password; false otehrwise
   */
  goodPassword(): boolean
  {
  	return this.password === this.checkPassword;
  }	

}
