import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SellerService } from 'src/app/seller.service';
import { ProductAd } from 'src/app/models/productAd.model';
import { AccommodationAd } from 'src/app/models/accommodationAd.model';
import {TYPE_OF_ACCOMMODATION, TYPE_OF_SERVICE, EQUIPMENT} from "src/app/dataForUse";
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'app-ad-description',
  templateUrl: './ad-description.component.html',
  styleUrls: ['./ad-description.component.css']
})
export class AdDescriptionComponent implements OnInit {

  adToShowId: String;
  typeOfAd: String;

  newDescription: String;
  newWeight: String;
  newPrice: String;
  newStructureOfProduct: String;
  newTypeOfAccommodation:String[]; 
  newTypeOfService: String[];
  newEquipment: String[];

  //helper variables
  typeOfAccommodationsList:String[] = TYPE_OF_ACCOMMODATION;
  typeOfServicesList: String[] = TYPE_OF_SERVICE;
  equipmentList: String[] = EQUIPMENT;

  myAd: any;
  loggedUser: User;

  constructor(private _location: Location,  private route: ActivatedRoute, private router: Router, private sellerService: SellerService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.adToShowId = params['adId'] || '';
        this.typeOfAd = params['adType'] || '';
      });
     
    if(this.typeOfAd=='productAd') 
      this.myAd = new ProductAd();
    else
      this.myAd = new AccommodationAd();
    
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        
    this.fetchAdByIdAndType(this.adToShowId, this.typeOfAd);
  }

  backClicked() {
    this._location.back();
  }

  //fetch from DB ad that has type typeOfAd and id adToShowId
  fetchAdByIdAndType(adToShowId: String, typeOfAd: String)
  {
    this.sellerService.fetchById(adToShowId, typeOfAd).subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(respMessage.success)
      {
        this.myAd = respMessage.bodyOfResponse[0];

        this.newTypeOfAccommodation=[];
        this.newTypeOfService=[];
        this.newEquipment=[];

        this.newTypeOfAccommodation = this.myAd.typeOfAccommodation;
        this.newTypeOfService = this.myAd.typeOfService;
        this.newEquipment = this.myAd.equipment;
      }
      else
      {
        this.myAd= null;
      }
      
      },
      err => {
        console.log("Greska pri pregledu detalja oglasa za prodavca: dohvatanje oglasa nije uspelo");
        console.log(err.error);
      }
    );
  }

 

  changeProperty(property: String)
  {

    
    switch(property) { 
      case 'description': { 

        this.sellerService.updateAdWithId(this.typeOfAd, this.adToShowId, property, this.newDescription).subscribe( data => {
          alert("Opis oglasa je uspešno izmenjen");
          location.reload();
        },
        err => {
          console.log("Greška pri izmeni informacija za oglas proizvoda: izmena nije uspela");
          console.log(err.error);
        }
      );
         break; 
      } 
      case 'structureOfProduct': { 
        
        this.sellerService.updateAdWithId(this.typeOfAd, this.adToShowId, property, this.newStructureOfProduct).subscribe( data => {
          alert("Opis strukture proizvoda je uspešno izmenjen");
          location.reload();
        },
        err => {
          console.log("Greška pri izmeni informacija za oglas proizvoda: izmena nije uspela");
          console.log(err.error);
        }
       );
        break; 
     } 
      case 'weight': { 
        this.sellerService.updateAdWithId(this.typeOfAd, this.adToShowId, property, this.newWeight).subscribe( data => {
          alert("Težina proizvoda je uspešno izmenjena");
          location.reload();
        },
        err => {
          console.log("Greška pri izmeni informacija za oglas proizvoda: izmena nije uspela");
          console.log(err.error);
        }
       );
         break; 
      } 
      case 'price': { 
        this.sellerService.updateAdWithId(this.typeOfAd, this.adToShowId, property, this.newPrice).subscribe( data => {
          alert("Cena proizvoda je uspešno izmenjena");
          location.reload();
        },
        err => {
          console.log("Greška pri izmeni informacija za oglas proizvoda: izmena nije uspela");
          console.log(err.error);
        }
       );
        break; 
     } 
     case 'typeOfAccommodation': { 
      this.sellerService.updateAdWithIdArray(this.adToShowId, property, this.newTypeOfAccommodation).subscribe( data => {
        alert("Tip smeštaja je uspešno izmenjen");
        location.reload();
      },
      err => {
        console.log("Greška pri izmeni informacija za oglas smeštaja: izmena nije uspela");
        console.log(err.error);
      }
     );
      break; 
    } 
     case 'typeOfService': { 
      this.sellerService.updateAdWithIdArray(this.adToShowId, property, this.newTypeOfService).subscribe( data => {
        alert("Vrsta usluge je uspešno izmenjena");
        location.reload();
      },
      err => {
        console.log("Greška pri izmeni informacija za oglas smeštaja: izmena nije uspela");
        console.log(err.error);
      }
     );
      break; 
    } 
   case 'equipment': { 
    this.sellerService.updateAdWithIdArray(this.adToShowId, property, this.newEquipment).subscribe( data => {
      alert("Opremljenost je uspešno izmenjena");
      location.reload();
    },
    err => {
      console.log("Greška pri izmeni informacija za oglas smeštaja: izmena nije uspela");
      console.log(err.error);
    }
   );
    break; 
 } 
      default: { 
         break; 
      } 
   } 


  }




  

  

}
