import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ProductAd } from 'src/app/models/productAd.model';
import { AccommodationAd } from 'src/app/models/accommodationAd.model'; 
import {SellerService} from 'src/app/seller.service';
import { Router } from '@angular/router';
import {returnSmallerDescription} from '../../regexCheck';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  myProductAds: ProductAd[];
  myAccommodationAds: AccommodationAd[];
  myAds : any[];

  buttonChooseTypeOfAdsToShow: string = '';

  loggedUser: User = new User();

  constructor(private sellerService: SellerService, private router: Router) { }

  ngOnInit(): void {
    //this.buttonChooseTypeOfAdsToShow ='productAd';
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.fetchMyProductAds();
    this.fetchMyAccommodationAds();
  }

  fetchMyProductAds()
  {
   if(this.loggedUser!=null)
   {
      this.sellerService.fetchMyProductAds(this.loggedUser.username).subscribe( data => {
        let respMessage: any;
        respMessage = data; 

        if(respMessage.success)
        {
          this.myProductAds = respMessage.bodyOfResponse;

          for(let productAd of this.myProductAds)
          {
            productAd.description = returnSmallerDescription(productAd.description) + "...";
          }
        }
        else
        {
          this.myProductAds= null;
        }
        
      },
      err => {
        console.log("Greska pri dohvatanju oglasa za prodavca: dohvatanje oglasa za proizvode nije uspelo");
        console.log(err.error);
      }
      
      
      );
    }
  }

  fetchMyAccommodationAds()
  {
    if(this.loggedUser!=null)
    {
   
      this.sellerService.fetchMyAccommodationAds(this.loggedUser.username).subscribe( data => {
        let respMessage: any;
        respMessage = data; 

        
        if(respMessage.success)
        {
          this.myAccommodationAds = respMessage.bodyOfResponse;

          for(let accommodationAd of this.myAccommodationAds)
          {
            accommodationAd.description = returnSmallerDescription(accommodationAd.description) + "...";
          }
        }
        else
        {
          this.myAccommodationAds= null;
        }
        
      },
      err => {
        console.log("Greska pri dohvatanju oglasa za prodavca: dohvatanje oglasa za proizvode nije uspelo");
        console.log(err.error);
      }
      );
    }
  }

  checkNullArrayOfAds()
  {
    if (this.buttonChooseTypeOfAdsToShow=='productAd')
    {
      if(this.myProductAds.length==0)
      {
        alert("Nema dodatih oglasa za proizvode!");
      }
    }
    else
    {
      if(this.myAccommodationAds.length==0)
      {
        alert("Nema dodatih oglasa za smeštaj!");
      }
    }
  }

  public onValChange(value: string) {
    this.buttonChooseTypeOfAdsToShow = value;
  }


  seeAd(adId: String, adType: String)
  {
    this.router.navigate(['ad-description'], { queryParams: {adId: adId, adType: adType}});
  }

  deleteAd(adId: String, adType: String)
  {
    this.sellerService.deleteAdWithTypeAndId(adType, adId).subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      
      if(respMessage.success)
      {
        alert("Oglas je uspešno obrisan");
        location.reload();
      }
      else
      {
        alert("Brisanje nije uspelo!");
      }
      
    },
    err => {
      console.log("Greska pri dohvatanju oglasa za prodavca: dohvatanje oglasa za proizvode nije uspelo");
      console.log(err.error);
    }
    );
  }

  addAd()
  {
    this.router.navigate(['add-ad']);
  }

  logOut()
  {
    this.router.navigate(['']);
  }
}
