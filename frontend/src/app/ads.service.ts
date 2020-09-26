import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAd } from './models/productAd.model';
import { AccommodationAd } from './models/accommodationAd.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdsService {

  url : string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  fetchAllProductAds()
  {
    return this.http.get(`${this.url}/choose-for-me/productAds`);
  }

  fetchAllAccommodationAds()
  {
    return this.http.get(`${this.url}/choose-for-me/accommodationAds`);
  }
}
