import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
{

	/**
   * Constructor for this class - creating injectables and initializing global variables
   *
   * @param afAuth - injectable AngularFireAuth
   * @param auth - injectable AuthService
   * @param router - injectable Router
   * @returns void
   */
  constructor(public afAuth:AngularFireAuth,
  	private auth:AuthService,
  	private router:Router ) { }

  /**
   * Log the user out and return to the homepage after 0.5 seconds.
   *
   * @returns void
   */
  logOut():void
  {
  	this.auth.logout();
    setTimeout(() => this.router.navigateByUrl("/home"), 500);
  }

}
