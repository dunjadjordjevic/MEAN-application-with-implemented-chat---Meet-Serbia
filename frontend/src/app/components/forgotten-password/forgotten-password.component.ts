import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import {checkPassword} from 'src/app/regexCheck';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  newPassword1: String = null; 
  newPassword2: String = null; 
  username : String = null;

  constructor(private snackBar: MatSnackBar, private loginService: LoginService, private router: Router) { }
  

  ngOnInit(): void {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  changePassword()
  {
    if (this.newPassword1==null || this.newPassword1=='' || this.newPassword2==null || this.newPassword2=='' || this.username==null || this.username=='')
    {
      this.openSnackBar("Unesite sve potrebne informacije za promenu lozinke!", "X");
    }
    else
    {
      if (this.newPassword1!=this.newPassword2)
      {
        this.openSnackBar("Ponovljena lozinka se ne slaže sa novom lozinkom. Pokušajte ponovo!", "X");
        console.log("Ponovljena lozinka se ne slaže sa novom lozinkom. Pokušajte ponovo!");
      }
      else
      {
        if (!checkPassword(this.newPassword1))
        {
          this.openSnackBar("Uneta lozinka ne ispunjava tražene uslove!", "X");
          console.log("Uneta lozinka ne ispunjava tražene uslove!");
        } 
        else
        {
          this.loginService.changePassword(this.username, this.newPassword1).subscribe(
            data => {
              
              let respMessage: any;
              respMessage = data;
              

              if(respMessage.success)
              {
                this.openSnackBar("Lozinka je uspešno promenjena. Prijavite se na sistem.", ":)");
                this.router.navigate(['/login']);
              }
              else
              {
                this.openSnackBar(respMessage.msg, 'X');
              }
              
            },
            err => {
              console.log(err);
              this.openSnackBar(err, 'X');
            }
          );
        }
        
      }
    }
      
    }

    back()
    {
      this.router.navigate(['/login']);
    }
  }
