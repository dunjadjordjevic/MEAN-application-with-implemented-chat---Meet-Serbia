import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductAd } from 'src/app/models/productAd.model';
import { AccommodationAd } from 'src/app/models/accommodationAd.model';
import {AdminService} from 'src/app/admin.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async } from 'rxjs/internal/scheduler/async';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  columnNameProductAdList: String[] =[

    "Naziv oglasa",
    "Datum postavljanja",
    "Vlasnik oglasa",
    "Cena", 
    "Težina",
    "Sastav proizvoda",
    "Tip proizvoda",
    "Opis",
    "Odobri",
    "Odbaci"

  ];

  columnNameAccommodationAdList: String [] = [
    "Naziv oglasa",
    "Datum postavljanja",
    "Vlasnik oglasa",
    "Destinacija",
    "Cena",
    "Vrsta smeštaja",
    "Tip usluge",
    "Opremljenost",
    "Opis",
    "Odobri",
    "Odbaci"
  ];


  displayedColumnsProductAd: string[] = ['naziv oglasa', 'datum postavljanja', 'vlasnik oglasa', 'cena', 'težina', 'sastav proizvoda', 'tip proizvoda','opis', 'odobri', 'odbaci'];
  displayedColumnsAccommodationAd: string[] = ['naziv oglasa', 'datum postavljanja', 'vlasnik oglasa', 'destinacija', 'cena', 'vrsta smeštaja', 'tip usluge', 'opremljenost', 'opis',  'odobri', 'odbaci'];

  allProductAdsForWaiting: ProductAd[];
  allAccommodationAdsForWaiting: AccommodationAd[];

  dataSourceProductAd: MatTableDataSource<ProductAd>;
  dataSourceAccommodationAd: MatTableDataSource<AccommodationAd>;

  @ViewChild(MatPaginator, {static: true}) paginatorProductAd: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) paginatorAccommodationAd: MatPaginator;

  constructor(private adminService: AdminService, private location: Location, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.fetchWaitingProductAds();
    this.fetchWaitingAccommodationAds();
  }

  fetchWaitingProductAds()
  {
    this.adminService.fetchWaitingProductAds().subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(respMessage.success)
      {
        this.allProductAdsForWaiting = respMessage.bodyOfResponse;
        this.dataSourceProductAd = new MatTableDataSource<ProductAd>(this.allProductAdsForWaiting);
        this.dataSourceProductAd.paginator = this.paginatorProductAd;
      }
      else
      {
        this.allProductAdsForWaiting= null;
      }
    },
    err => {
      console.log("Greska: dohvatanje oglasa za proizvode koji su na čekanju nije uspelo");
      console.log(err.error);
    }
    );
  }

  fetchWaitingAccommodationAds()
  {
    this.adminService.fetchWaitingAccommodationAds().subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(respMessage.success)
      {
        this.allAccommodationAdsForWaiting = respMessage.bodyOfResponse;
        this.dataSourceAccommodationAd = new MatTableDataSource<AccommodationAd>(this.allAccommodationAdsForWaiting);
        this.dataSourceAccommodationAd.paginator = this.paginatorAccommodationAd;
      }
      else
      {
        this.allAccommodationAdsForWaiting= null;
      }
    },
    err => {
      console.log("Greska: dohvatanje oglasa za smeštaj koji su na čekanju nije uspelo");
      console.log(err.error);
    }
    );
  }

  back()
  {
    this.location.back();
  }

  
  async openSnackBar(message: string, action: string) {
    await this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  approveAd(typeOfAd:String, id)
  {
    this.adminService.approveAdWithTypeAndId(typeOfAd, id).subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(respMessage.success)
      {
        this.openSnackBar('Oglas je uspešno odobren','!');
        window.location.reload();
      }
      else
      {
        this.openSnackBar('Oglas nije moguće odobriti. Desila se greška!','X');
      }
      
      },
      err => {
        console.log("Greska prilikom odobravanja oglasa: izmena statusa oglasa nije uspela");
        console.log(err.error);
      }
    );
  }
   

  declineAd(typeOfAd:String, id)
  {
    
    this.adminService.declineAdWithTypeAndId(typeOfAd, id).subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(respMessage.success)
      {
        this.openSnackBar('Oglas je uspešno odbačen','!');
        window.location.reload();
      }
      else
      {
        this.openSnackBar('Oglas nije moguće odbaciti. Desila se greška!','X');
      }
      
      },
      err => {
        console.log("Greska prilikom odbacivanja oglasa: izmena statusa oglasa nije uspela");
        console.log(err.error);
      }
    );
  }

  
  logOut()
  {
    this.router.navigate(['']);
  }
}
