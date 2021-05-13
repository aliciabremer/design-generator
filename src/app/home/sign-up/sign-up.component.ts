import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userName:string = "";
  email:string = "";
  password:string = "";
  checkPassword:string ="";

  incorrect:boolean = false;

  constructor(private auth: AuthService,
  	private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() : void
  { 
  	this.incorrect = !this.auth.signUpWithEmail(this.email, this.password); 
  	if (!this.incorrect)
  	{
  		setTimeout(() => this.router.navigateByUrl("/create"), 1000);
  	}
  }

  goodPassword(): boolean
  {
  	return this.password === this.checkPassword;
  }	

}
