import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from 'src/app/seller.service';
import { Location } from '@angular/common';
import { ProductAd } from 'src/app/models/productAd.model';
import { AccommodationAd } from 'src/app/models/accommodationAd.model';
import {TYPE_OF_PRODUCT, TYPE_OF_ACCOMMODATION, TYPE_OF_SERVICE, EQUIPMENT} from 'src/app/dataForUse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {

  typeOfAdToAdd: String;
  newProductAd: ProductAd;
  newAccommodationAd: AccommodationAd;
  productFileToUpload:File = null;
  accommodationFileToUpload:File = null;

  types: String [] = TYPE_OF_PRODUCT;
  typesOfAccommodation: String [] = TYPE_OF_ACCOMMODATION;
  typesOfService: String [] = TYPE_OF_SERVICE;
  equipmentList: String [] = EQUIPMENT;

  constructor(private _location: Location,  private route: ActivatedRoute, private router: Router, private sellerService: SellerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.typeOfAdToAdd= '';
    this.newProductAd = new ProductAd();
    this.newAccommodationAd = new AccommodationAd();
  }

  backClicked() {
    this._location.back();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  fileUpload(typeOfAd: String, fileInputEvent: any) {
    // console.log(fileInputEvent.target.files[0]);
    if(typeOfAd=='productAd')
      this.productFileToUpload = fileInputEvent.target.files[0];
    else
      this.accommodationFileToUpload = fileInputEvent.target.files[0];
   }

  
  addAd(typeOfAd: String, formIsValid: boolean)
  {
    // console.log("Uneti podaci:");
    // console.log(typeOfAd);
    // console.log(this.newProductAd);
    // console.log(this.newAccommodationAd);
    
    if(formIsValid)
    {
      if((this.productFileToUpload==null && typeOfAd=='productAd') || (this.accommodationFileToUpload==null && typeOfAd=='accommodationAd'))
      {
        this.openSnackBar('Unos slike za oglas koji se postavlja je obavezan!', 'X');
      }
      else
      {
        if(typeOfAd=='productAd')
        {
          this.newProductAd.ownerUsername = JSON.parse(localStorage.getItem('loggedUser')).username;
          this.sellerService.addAdWithType('productAd', this.productFileToUpload, this.newProductAd).subscribe(
            data => {
              
              let respMessage: any;
              respMessage = data;
    
              if(respMessage.success)
              {
                //eventualno poruka kroz snack bar i vracanje na moje oglase /seller/...
                this.openSnackBar("Vaš oglas je uspešno poslat na pregled administratorima sistema!", ':)');
              }
              else
              {
                this.openSnackBar('Oglas pod navedenim imenom već postoji. Nije moguće dodati novi oglas sa istim imenom!', 'X');
              }
              
            },
            err => {
              console.log(err);
              this.openSnackBar('Nije moguće dodati ovaj oglas. Greška!', 'X');
            }
          );
        }
        else
        {
          this.newAccommodationAd.ownerUsername = JSON.parse(localStorage.getItem('loggedUser')).username;
            this.sellerService.addAdWithType('accommodationAd', this.accommodationFileToUpload, this.newAccommodationAd).subscribe(
            data => {
              
              let respMessage: any;
              respMessage = data;
    
              if(respMessage.success)
              {
                //eventualno poruka kroz snack bar i vracanje na moje oglase /seller/...
                this.openSnackBar("Vaš oglas je uspešno poslat na pregled administratorima sistema!", ':)');
              }
              else
              {
                this.openSnackBar('Oglas pod navedenim imenom već postoji. Nije moguće dodati novi oglas sa istim imenom!', 'X');
              }
              
            },
            err => {
              console.log(err);
             this.openSnackBar('Nije moguće dodati ovaj oglas. Greška!', 'X');
            }
          );
        }
      }
    }
    else
    {
      this.openSnackBar("Unesite sva obavezna polja!", 'X');
    }

    

    
  }
  

}
