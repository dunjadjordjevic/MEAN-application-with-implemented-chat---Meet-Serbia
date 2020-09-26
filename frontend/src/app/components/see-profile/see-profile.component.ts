import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import {checkEmail, checkTelephone} from 'src/app/regexCheck';

@Component({
  selector: 'app-see-profile',
  templateUrl: './see-profile.component.html',
  styleUrls: ['./see-profile.component.css']
})
export class SeeProfileComponent implements OnInit {

  usernameFromURL: string = '';
  userToDisplay: User = null;
  loggedUser: User;
  haveUsernameInURL=false;

  //korisnik ciji se profil pregleda 
  userFromURL: User = null;

  
  nameForChange: String = null;
  surnameForChange: String = null;
  occupationForChange: String = null;
  emailForChange: String = null;
  contactTelephoneForChange: String = null;

  constructor(private router: Router, private route:ActivatedRoute, private loginService: LoginService, private snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));


    this.route.queryParams.subscribe(params => {

      if (params.hasOwnProperty('username'))
      {
        this.haveUsernameInURL=true;
        //console.log(params['username']);
        //kroz url se salje username osobe ciji se profil gleda
        this.usernameFromURL = params['username'];

        if(this.loggedUser.username != this.usernameFromURL) 
        {
          //u slucaju da se pregleda tudji profil
          //dohvatanje user-a iz baze ciji se profil pregleda
          this.loginService.fetchUserWithUsername(this.usernameFromURL).subscribe(
            data => {
              
              let respMessage: any;
              respMessage = data;
    
              if(respMessage.success)
              {
                this.userFromURL = respMessage.bodyOfResponse;
              }
              else
              {
                this.openSnackBar(respMessage.msg, 'X');
              }
              
            },
            err => {
              console.log(err);
              this.openSnackBar("Nije moguće prikazati informacije o profilu za traženog korisnika", 'X');
            }
          );
        }
        else
        {
          this.userFromURL = this.loggedUser;
        }
      }
      else
      {
        //pregled profila iz komponente seller (dakle sam pregledam svoj profil)
        this.usernameFromURL = this.loggedUser.username+'';
        this.userFromURL = this.loggedUser;
      }
    }


  );

  // console.log("loggedUser  - osoba koja pregleda profil");
  // console.log(this.loggedUser);
  // console.log("userFromUrl - osoba ciji se profil pregleda");
  // console.log(this.userFromURL);

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  backToSeller()
  {
    this.location.back();
    
  }

  changeProperty(property: String)
  {

    
    switch(property) { 
      case 'name': { 

        this.loginService.updateUserProperty(this.userFromURL.username, property, this.nameForChange).subscribe( data => {
          
              let respMessage: any;
              respMessage = data;

              if(respMessage.success)
              {
                this.userFromURL = respMessage.bodyOfResponse;

                if(this.loggedUser.username==this.userFromURL.username)
                {
                  this.loggedUser=this.userFromURL;
                  localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
                }

                this.openSnackBar("Uspešno je izmenjeno polje ime korisnika",":)");
              }
              else
              {
                this.openSnackBar('Izmena polja ime nije izvršena', 'X');
              }
              
            },
            err => {
              console.log(err);
              this.openSnackBar('Izmena polja ime nije izvršena', 'X');
            }
          );
         break; 
      } 
        case 'surname': { 
          
          this.loginService.updateUserProperty(this.userFromURL.username, property, this.surnameForChange).subscribe( data => {
          
            let respMessage: any;
            respMessage = data;

            if(respMessage.success)
            {
              this.userFromURL = respMessage.bodyOfResponse;

              if(this.loggedUser.username==this.userFromURL.username)
                {
                  this.loggedUser=this.userFromURL;
                  localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
                }

              this.openSnackBar("Uspešno je izmenjeno polje prezime korisnika",":)");
            }
            else
            {
              this.openSnackBar('Izmena polja prezime nije izvršena', 'X');
            }
            
          },
          err => {
            console.log(err);
            this.openSnackBar('Izmena polja prezime nije izvršena', 'X');
          }
        );
        
          break; 
      } 
        case 'email': { 

          if(checkEmail(this.emailForChange))
          {
          
          this.loginService.updateUserProperty(this.userFromURL.username, property, this.emailForChange).subscribe( data => {
          
            let respMessage: any;
            respMessage = data;

            if(respMessage.success)
            {
              this.userFromURL = respMessage.bodyOfResponse;

              if(this.loggedUser.username==this.userFromURL.username)
                {
                  this.loggedUser=this.userFromURL;
                  localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
                }


              this.openSnackBar("Uspešno je izmenjeno polje e-mail korisnika",":)");
            }
            else
            {
              this.openSnackBar('Izmena polja e-mail nije izvršena', 'X');
            }
            
          },
          err => {
            console.log(err);
            this.openSnackBar('Izmena polja e-mail nije izvršena', 'X');
          }
        );
          }
          else
          {
            this.openSnackBar("Uneta e-mail adresa za izmenu se ne poklapa sa restrikcijama za e-mail adresu.", "X");
          }

          break; 
        } 
        case 'occupation': { 

          this.loginService.updateUserProperty(this.userFromURL.username, property, this.occupationForChange).subscribe( data => {
          
            let respMessage: any;
            respMessage = data;

            if(respMessage.success)
            {
              this.userFromURL = respMessage.bodyOfResponse;

              if(this.loggedUser.username==this.userFromURL.username)
                {
                  this.loggedUser=this.userFromURL;
                  localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
                }

              this.openSnackBar("Uspešno je izmenjeno polje zanimanje korisnika",":)");
            }
            else
            {
              this.openSnackBar('Izmena polja zanimanje nije izvršena', 'X');
            }
            
          },
          err => {
            console.log(err);
            this.openSnackBar('Izmena polja zanimanje nije izvršena', 'X');
          }
        );
        
          break; 
      } 
      case 'contactTelephone': { 

        if(checkTelephone(this.contactTelephoneForChange))
        {
        
        this.loginService.updateUserProperty(this.userFromURL.username, property, this.contactTelephoneForChange).subscribe( data => {
          
          let respMessage: any;
          respMessage = data;

          if(respMessage.success)
          {
            this.userFromURL = respMessage.bodyOfResponse;

            if(this.loggedUser.username==this.userFromURL.username)
                {
                  this.loggedUser=this.userFromURL;
                  localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
                }

            this.openSnackBar("Uspešno je izmenjeno polje kontakt telefon korisnika",":)");
          }
          else
          {
            this.openSnackBar('Izmena polja kontakt telefon nije izvršena', 'X');
          }
          
        },
        err => {
          console.log(err);
          this.openSnackBar('Izmena polja kontakt telefon nije izvršena', 'X');
        }
      );
        }
        else
        {
          this.openSnackBar("Broj telefona mora da sadrži samo 6 cifara. Pokušajte ponovo!", "X");
        }

        break; 
      } 
    default: { 
        break; 
    } 
   } 


  }



}
