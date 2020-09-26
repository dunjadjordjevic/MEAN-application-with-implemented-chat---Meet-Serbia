import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { checkPassword, checkEmail } from "../../regexCheck";
import {RegistrationService} from '../../registration.service';
import { FormBuilder} from '@angular/forms';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})



export class RegistrationComponent implements OnInit {

  message: FormControl;
  typeOfUserInput: String;
  legalEntityOrIndividual: String;
  firstForm: FormGroup;

  emaill = new FormControl('', [Validators.required, Validators.email]);
  passwordd = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,12}$/)]);
  usernamee = new FormControl('', [Validators.required]);
  tell = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]);
  errorMessageEmail : String;
  errorMessagePass: String;
  errorMessageUsername: String;
  errorMessageTel: String;

  //fields for form input get
  passwordCheck: String;
  user: User = {} as null;

  errorExists: boolean = false;
  errorExistsMessage:String = '';

  compFirstAndSecond: Boolean = false;
  compThirdAndFourth: Boolean = false;
  compFifth: Boolean = false;

  fileToUpload: File = null;

  //Rajkovic ovako ubacuje sliku
  // handleFileInput(files: FileList) {
  //   //save profilePicture in this.fileToUpload
  //   this.fileToUpload = files.item(0);
  // }


  fileUpload(fileInputEvent: any) {
   
    this.fileToUpload = fileInputEvent.target.files[0];
    
  }

  constructor(private router: Router, private registrationService: RegistrationService, private _location: Location, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = new User();
    this.passwordCheck='';

    this.errorMessageEmail='';
    this.errorMessagePass='';
    this.errorMessageUsername='';
    this.errorMessageTel='';
    this.message = new FormControl('Lozinka mora imati najmanje 8, a najviše 12 karaktera, minimalno 1 veliko slovo, minimalni broj numerika 1 i minimalno 1 specijalni karakter. Početni karakter mora biti slovo.');
  
  }


  getErrorMessageForEmail() 
  {
    if (this.emaill.hasError('required')) 
    {
      this.errorMessageEmail='Ovo polje je obavezno';
      return this.errorMessageEmail;
    }

    this.errorMessageEmail= this.emaill.hasError('email') ? 'Uneti podatak nije validan' : '';
    return this.errorMessageEmail;

  }

  getErrorMessageForPassword() 
  {
    if (this.passwordd.hasError('required')) 
    {
      this.errorMessagePass='Ovo polje je obavezno';
      return this.errorMessagePass;
    }
    // this.passwordd.hasError('password')
    this.errorMessagePass=  this.passwordd.valid==false ? 'Uneti podatak nije validan' : '';
    return this.errorMessagePass;
  }

  getErrorMessageForTel()
  {
    if (this.tell.hasError('required')) 
    {
      this.errorMessageTel='Ovo polje je obavezno';
      return this.errorMessageTel;
    }

    this.errorMessageTel=  this.tell.valid==false ? 'Uneti podatak nije validan' : '';
    return this.errorMessageTel;
  }

  //TO DO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  isUniqueUsername(): ValidatorFn
  {
    //provera u bazi da li vec postoji takav korisnik 
    return null;
  }

  getErrorMessageForUsername() 
  {
    if (this.passwordd.hasError('required')) 
    {
      this.errorMessagePass='Ovo polje je obavezno';
      return this.errorMessagePass;
    }
  }

  //true if string str is null or empty
  isEmptyString(str) {

    var valueStr = str==undefined? '' : str;
    return !valueStr.trim().length;
  }   

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  registration(stepper: MatStepper)
  {
      localStorage.setItem('usernameForRegistration', this.user.username+'');

      this.errorExists = false;
      this.compFifth = true;

      if (this.fileToUpload === null) 
      {
        this.errorExists = true;
        this.compFifth = false;
        this.errorExistsMessage = "Neophodno je da izaberete profilnu sliku.";
        this.openSnackBar('Morate učitati profilnu sliku pri registraciji!', 'X');
      } 
      else 
      {   
        //this.registrationService.register(this.user).subscribe(
        this.registrationService.register(this.fileToUpload, this.user).subscribe(
          data => {
            let respMessage: any;
            respMessage = data; 
            if(respMessage.success)
            {
              //back to home page to login in
              this.errorExistsMessage = '';
              this.errorExists = false;
              this.openSnackBar('Uspešno ste se registrovali. Pređite na tab za prijavu.', ':)');
            }
            else
            {
              console.log(respMessage.msg);
            }
            
          // setTimeout(()=>stepper.next(),0);
          },
          err => {

            this.errorExists = true;
            this.compFifth = false;
            this.errorExistsMessage = err.error;
          }
        );

    }

  }

  stepElementaryData(stepper: MatStepper) 
  {
    this.errorExists = false;
    this.compFirstAndSecond = true;

    if (!checkPassword(this.user.password))
    {
      this.errorExists = true;
      this.compFirstAndSecond = false;
      this.errorExistsMessage = "Uneta lozinka ne ispunjava tražene uslove!";
    } 
    else {
        setTimeout(()=>stepper.next(),0);
    }
  }

  

  stepIndividual(stepper: MatStepper)
  {
    this.errorExists = false;
    this.compThirdAndFourth = true;

    setTimeout(()=>stepper.next(),0);

  }

  stepLegalEntity(stepper: MatStepper)
  {
    this.errorExists = false;
    this.compThirdAndFourth = true;

    setTimeout(()=>stepper.next(),0);

  }

}
