import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {LoginService} from '../../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loggedUser: User = new User();
  userForCheck: User = new User();

  logInForm: FormGroup;


  constructor(private _snackBar: MatSnackBar, private router: Router, private loginService: LoginService ) { }

  ngOnInit(): void {
    
    localStorage.removeItem('loggedUser');

    this.logInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  login(logInFormIsValid)
  {
    //check if user with username and password exists

    if (logInFormIsValid) 
    {
      this.userForCheck.username = this.username;
      this.userForCheck.password = this.password;

      this.loginService.login(this.userForCheck).subscribe(
        data => {
          
          let respMessage: any;
          respMessage = data;

          if(respMessage.success)
          {
            //go to page for loggedUser
            this.loggedUser=respMessage.body;
            //keep information about loggedUser in localStorage
            localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
            this.router.navigate([this.loggedUser.typeOfUser+'']);
          }
          else
          {
            this.openSnackBar('Korisnik sa korisničkim imenom ' + this.username + ' i navedenom lozinkom se ne nalazi u sistemu', 'X');
          }
          
        },
        err => {
          console.log(err);
          this.openSnackBar('Korisnik sa korisničkim imenom ' + this.username + ' i navedenom lozinkom se ne nalazi u sistemu', 'X');
        }
      );

      
    }
    else
    {
     
      this.openSnackBar('Unesite tražene podatke kako biste se prijavili na sistem!','X');
    }
  }

}
