import { Component, OnInit } from '@angular/core';
import { ProductAd } from '../../models/productAd.model';
import { AccommodationAd } from '../../models/accommodationAd.model';
import { Router } from '@angular/router';
import { AdsService } from '../../ads.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TYPE_OF_PRODUCT, TYPE_OF_ACCOMMODATION, EQUIPMENT, TYPE_OF_SERVICE} from 'src/app/dataForUse';
import {returnSmallerDescription} from '../../regexCheck';


@Component({
  selector: 'app-choose-for-me',
  templateUrl: './choose-for-me.component.html',
  styleUrls: ['./choose-for-me.component.css']
})
export class ChooseForMeComponent implements OnInit {

  allProductAds: ProductAd[];
  allAccommodationAds: AccommodationAd [];

  filteredProductAds: ProductAd[];
  filteredAccommodationAds: AccommodationAd[];

  allDestinations: String[]=[];
  buttonChooseTypeOfAdsToShow: string;
  loggedUser: User = null;

  //filter for ProductAd information
  filterName: String = null;
  filterTypeOfProduct: String[] = [];
  filterPrice: String = null;

  myControlNameOfAd = new FormControl();
  filterProdNameOptions : string[]= [];
  
  filteredProdNameOptions: Observable<string[]>;

  typesOfProduct: String[] = TYPE_OF_PRODUCT;

  filterProductAd: ProductAd = new ProductAd(); 
  valueOfPriceSlider = String;


  //filter for AccommodationAd information
  filterAccommodationAd: AccommodationAd = new AccommodationAd(); 
  filterDestination: String = null;
  filterAccNameOptions: string[]=[];
  filteredAccNameOptions: Observable<string[]>;

  typesOfAccommodation: String[] = TYPE_OF_ACCOMMODATION;
  typesOfService: String[] = TYPE_OF_SERVICE;
  equipments: String[] = EQUIPMENT;

  
  filterOn=false;

  constructor(private router: Router, private adsService: AdsService, private snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {

    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    this.buttonChooseTypeOfAdsToShow ='accommodationAd';

    this.fetchAllProductAds();
    this.fetchAllAccommodationAds();


    this.filteredProdNameOptions = this.myControlNameOfAd.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterForProd(value))
    );

    this.filteredAccNameOptions = this.myControlNameOfAd.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterForAcc(value))
    );
   
  }

  private _filterForProd(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.filterProdNameOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterForAcc(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.filterAccNameOptions.filter(option => option.toLowerCase().includes(filterValue));
  }


  fetchAllProductAds()
  {
    //get all ads from database (productAds)
    this.adsService.fetchAllProductAds().subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(respMessage.success)
      {
        //console.log("DUKI PISE (choose-for-me.component.ts): sve oke");
        this.allProductAds = respMessage.bodyOfResponse;

        for (let productAd of this.allProductAds)
        {
          if (productAd.approvedByAdmin==true)
          {
            this.filterProdNameOptions.push(productAd.nameOfAd+'');
          }

          productAd.description = returnSmallerDescription(productAd.description) + "...";
        }
      }
      else
      {
        this.allProductAds= null;
      }
      
      // console.log('Informacije o oglasima za proizvode :');
      // console.log(this.allProductAds);
    },
    
    err => {
      console.log("Greska: dohvatanje oglasa za proizvode nije uspelo");
      console.log(err.error);
    }
    );

  }


  fetchAllAccommodationAds()
  {
    //get all ads from database (productAds)
    this.adsService.fetchAllAccommodationAds().subscribe(data => {
        let respMessage: any;
        respMessage = data; 
        if(respMessage.success)
        {
          //console.log("DUKI PISE (choose-for-me.component.ts): sve oke");
          this.allAccommodationAds = respMessage.bodyOfResponse;

          for (let accommodationAd of this.allAccommodationAds)
          {
            if (accommodationAd.approvedByAdmin==true)
            {
              this.filterAccNameOptions.push(accommodationAd.nameOfAd+'');

              if(accommodationAd.destination)
                this.allDestinations.push(accommodationAd.destination);
            }
            accommodationAd.description = returnSmallerDescription(accommodationAd.description) + "...";
          }

          // console.log("SVE DESTINACIJE");
          // console.log(this.allDestinations);
        }
        else
        {
          this.allAccommodationAds= null;
        }

        // console.log('Informacije o oglasima za smeštaj :');
        // console.log(this.allAccommodationAds);
        
      }
      ,
      err => {

       console.log("Greska: dohvatanje oglasa za smeštaj nije uspelo");
        console.log(err.error);
      }
    );
  }

  public onValChange(value: string) {
    this.buttonChooseTypeOfAdsToShow = value;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  showAd(typeOfAd: String, adId)
  {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (loggedUser==null)
    {
      this.openSnackBar("Korisnik koji je gost nema mogućnost da pregleda oglase. Molimo Vas da se prvo registrujete.", "X");
    }
    else
    {
      if(loggedUser.typeOfUser=='seller')
      {
        this.router.navigate(['ad-description'], { queryParams: {adId: adId, adType: typeOfAd}});
      }
      else
      {
        this.router.navigate(['ad-description'], { queryParams: {adId: adId, adType: typeOfAd}});
      }
    }
  }


  deleteFilters()
  {
    this.filterOn=false;    
  }

  filterProductAdFunction(productAd)
  {
    var attachProduct=false;

    if(this.filterProductAd.nameOfAd && this.filterProductAd.nameOfAd==productAd.nameOfAd)
    {
        attachProduct=true;
    }
    else
    {
      if(!this.filterProductAd.nameOfAd)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }

    if(Number.parseFloat(this.valueOfPriceSlider+'') && attachProduct==true && Number.parseFloat(productAd.price+'')<=Number.parseFloat(this.valueOfPriceSlider+''))
    {
      attachProduct=true;
    }
    else
    {
      if(!Number.parseFloat(this.valueOfPriceSlider+'') && attachProduct==true) 
        attachProduct=true; //prazan filter za valueOfPriceSlider, filter za nameOfAd je ok
      else
        attachProduct=false;
    }
   
    if(attachProduct==true && this.filterProductAd.typeOfProduct)
    {
      //check if input filter for typeOfProduct is subset of typeOfProducut array in productAd
      var isSubset = this.filterProductAd.typeOfProduct.every( function(val) {
        return productAd.typeOfProduct.includes(val+'');
      }, this);

      if(isSubset==true)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }
    else
    {
      if (attachProduct==true && !this.filterProductAd.typeOfProduct)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }
    
    //if(this.filterProductAd.typeOfProduct.every())

    return attachProduct;
  }

  filterAccommodationAdFunction(accommodationAd)
  {
    var attachProduct=false;

    if(this.filterAccommodationAd.nameOfAd && this.filterAccommodationAd.nameOfAd==accommodationAd.nameOfAd)
    {
        attachProduct=true;
    }
    else
    {
      if(!this.filterAccommodationAd.nameOfAd)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }

    if(Number.parseFloat(this.valueOfPriceSlider+'') && attachProduct==true && Number.parseFloat(accommodationAd.price+'')<=Number.parseFloat(this.valueOfPriceSlider+''))
    {
      attachProduct=true;
    }
    else
    {
      if(!Number.parseFloat(this.valueOfPriceSlider+'') && attachProduct==true) 
        attachProduct=true; //prazan filter za valueOfPriceSlider, filter za nameOfAd je ok
      else
        attachProduct=false;
    }

    if(attachProduct==true && this.filterAccommodationAd.destination)
    {
      if(this.filterAccommodationAd.destination==accommodationAd.destination)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }
    else
    {
      if(attachProduct==true && !this.filterAccommodationAd.destination )
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }
   
    if(attachProduct==true && this.filterAccommodationAd.typeOfAccommodation)
    {
      //check if input filter for typeOfProduct is subset of typeOfProducut array in productAd
      var isSubsetTypeOfAccommodation = this.filterAccommodationAd.typeOfAccommodation.every( function(val) {
        return accommodationAd.typeOfAccommodation.includes(val+'');
      }, this);

      if(isSubsetTypeOfAccommodation==true)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }
    else
    {
      if (attachProduct==true && !this.filterAccommodationAd.typeOfAccommodation)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }
    
    if(attachProduct==true && this.filterAccommodationAd.typeOfService)
    {
      //check if input filter for typeOfProduct is subset of typeOfProducut array in productAd
      var isSubsetTypeOfService = this.filterAccommodationAd.typeOfService.every( function(val) {
        return accommodationAd.typeOfService.includes(val+'');
      }, this);

      if(isSubsetTypeOfService==true)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }
    else
    {
      if (attachProduct==true && !this.filterAccommodationAd.typeOfService)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }

    if(attachProduct==true && this.filterAccommodationAd.equipment)
    {
      //check if input filter for typeOfProduct is subset of typeOfProducut array in productAd
      var isSubsetEquipment = this.filterAccommodationAd.equipment.every( function(val) {
        return accommodationAd.equipment.includes(val+'');
      }, this);

      if(isSubsetEquipment==true)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }
    else
    {
      if (attachProduct==true && !this.filterAccommodationAd.equipment)
      {
        attachProduct=true;
      }
      else
      {
        attachProduct=false;
      }
    }

    return attachProduct;
  }

  showFilteredAds(typeOfAd: String)
  {
    this.filterOn=true;
    if(typeOfAd=='productAd')
    {
      this.filterProductAd.nameOfAd=this.myControlNameOfAd.value;
      // console.log("Filter za ime: ");
      // console.log(this.filterProductAd.nameOfAd);

      // console.log("Filter za tip proizvoda");
      // console.log(this.filterProductAd.typeOfProduct);

      // console.log("Slajder za cenu:");
      // let valueOfPriceSliderNumber = Number.parseFloat(this.valueOfPriceSlider+'');
      // console.log(valueOfPriceSliderNumber);

      this.filteredProductAds = this.allProductAds.filter(this.filterProductAdFunction, this);

    }
    else
    {
      this.filterAccommodationAd.nameOfAd= this.myControlNameOfAd.value;
      // console.log("Filter za ime acc: ");
      // console.log(this.filterAccommodationAd.nameOfAd);

      // console.log("Filter za destinaciju");
      this.filterAccommodationAd.destination = this.filterDestination;
      // console.log(this.filterAccommodationAd.destination);

      // console.log("Slajder za cenu:");
      let valueOfPriceSliderNumber = Number.parseFloat(this.valueOfPriceSlider+'');
      // console.log(valueOfPriceSliderNumber);

      // console.log("typeOfAccommodation");
      // console.log(this.filterAccommodationAd.typeOfAccommodation);

      // console.log("typeOfService");
      // console.log(this.filterAccommodationAd.typeOfService);

      // console.log("equipment");
      // console.log(this.filterAccommodationAd.equipment);

      this.filteredAccommodationAds = this.allAccommodationAds.filter(this.filterAccommodationAdFunction, this);
    }
    
  }

}
