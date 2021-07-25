import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService 
{
  
  userData: any = null;

  /**
   * Constructor for this class - creating injectables
   *
   * @param afAuth - injectable AngularFireAuth
   * @returns void
   */
  constructor(private afAuth: AngularFireAuth) 
  {
    this.afAuth.authState.subscribe((auth) => {
      this.userData = auth
    });
  }

  /**
   * Signs user up for a new account with their email and password
   * 
   * @param name - the user's name
   * @param email - the user's inputted email
   * @param password - the user's inputted email
   * @returns true if user signed up successfully; false otherwise
   */
  signUpWithEmail(email:string, password:string) : boolean
  {
  	var ret:boolean = true;
  	this.afAuth
  	.createUserWithEmailAndPassword(email, password)
  	.then(res => {
  		console.log('You are successfully signed up!'+ res);
  		ret = true; 
      this.logInWithEmail(email, password);
  	})
  	.catch(error => {
  		console.log('Something is very wrong: '+ error.message);
  		ret = false;
  	});
  	return ret;
  }

  /**
   * Logs user into their account with their email and password
   * 
   * @param email - the user's inputted email
   * @param password - the user's inputted email
   * @returns true if user logged in successfully; false otherwise
   */
  logInWithEmail(email:string, password:string) : boolean
  {
  	var ret:boolean = true;
  	this.afAuth
  	.signInWithEmailAndPassword(email, password)
  	.then(res => {
  		console.log("You're in"); 
  		ret = true;
  	})
  	.catch(error => {
  		console.log('Something is very wrong: '+ error.message);
  		ret = false;
  	});
  	return ret;
  }

  /**
   * Logs user out of their account
   * 
   * @returns void
   */
  logout(): void 
  {
    this.afAuth.signOut();
  }

  /**
   * Get the current user's id
   * 
   * @returns user's id
   */
  getId():Observable<string>
  {
    console.log((this.userData !== null) ? this.userData.email.substring(0, this.userData.email.indexOf(".")) : '');
    return of((this.userData !== null) ? this.userData.email.substring(0, this.userData.email.indexOf(".")) : '');
  }

  updateEmail():string
  {
    return "";
  }

}
