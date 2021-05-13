import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	/**
	 * This component takes in input called isLoggedIn, which is a boolean
	 * that is true if the user is logged in and false otherwise.
	 */

  constructor(public afAuth:AngularFireAuth,
  	private auth:AuthService,
  	private router:Router ) { }

  ngOnInit(): void {
  }

  logOut():void
  {
  	this.auth.logout();
    setTimeout(() => this.router.navigateByUrl("/home"), 1000);
  }

}
