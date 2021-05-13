import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {


  /**
   * Global variables
   *
   * email - the email being inputted during login
   * password - the password being inputted during login
   * incorrect - true if the user has inputted an incorrect email/password; false otherwise
   */
  email:string = ""; //store the email during login
  password:string = ""; //store the password during login
  incorrect:boolean = false; //

  /**
   * Constructor for this class - creating injectables
   *
   * @param auth - injectable AuthService
   * @param router - injectable Router
   * @returns void
   */
  constructor(private auth: AuthService,
  	private router: Router) { }

  /**
   * Logs user in when they submit their information - if login is not successful, changes the value of incorrect; if login is successful, navigates user to the create page
   *
   * @returns void
   */
  onSubmit() : void
  { 
  	this.incorrect = !this.auth.logInWithEmail(this.email, this.password); 
    
    //if login is successful
  	if (!this.incorrect)
  	{
  		setTimeout(() => this.router.navigateByUrl("/create"), 1000);
  	}
  }
}
