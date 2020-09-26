import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  url : string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  fetchMyProductAds(username: String)
  {
    return this.http.get(`${this.url}/seller/myProductAds?username=${username}`);
  }

  fetchMyAccommodationAds(username)
  {
    return this.http.get(`${this.url}/seller/myAccommodationAds?username=${username}`);
  }

  fetchById(adToShowId, typeOfAd)
  {
    if(typeOfAd=='productAd')
      return this.http.get(`${this.url}/seller/productAd?id=${adToShowId}`);
    else
      return this.http.get(`${this.url}/seller/accommodationAd?id=${adToShowId}`);
  }

  updateAdWithId(typeOfAd: String, id: String, property:String, value: String)
  {
    var returnValue;
    if(typeOfAd=='productAd')
    { 
      returnValue = this.http.post(`${this.url}/seller/productAd/update`, {id: id, property: property, value: value});
    }
    else
    {
      returnValue = this.http.post(`${this.url}/seller/accommodationAd/update`, {id: id, property: property, value: value});
    }

    return returnValue;
      
  }

  updateAdWithIdArray( id: String, property:String, value: String[])
  {
    var returnValue;
    returnValue = this.http.post(`${this.url}/seller/accommodationAd/update`, {id: id, property: property, value: value});
  
    return returnValue;
  }

  deleteAdWithTypeAndId(adType: String, id: String)
  {
    var returnValue;
    if(adType=='productAd')
    { 
      returnValue = this.http.delete(`${this.url}/seller/productAd/delete?id=${id}`);
    }
    else
    {
      returnValue = this.http.delete(`${this.url}/seller/accommodationAd/delete?id=${id}`);
    }

    return returnValue;
  }

  addAdWithType(typeOfAd: String, fileToUpload: File, ad): Observable<String>
  {
    const formData: FormData = new FormData();

    var returnValue;
    if(typeOfAd=='productAd')
    {
      formData.append('fileToUpload', fileToUpload, fileToUpload.name);
      formData.append('typeOfAd', 'productAd');
      formData.append('ad',JSON.stringify(ad));
      

      returnValue = this.http.post<String>(`${this.url}/seller/add/productAd`, formData);
    }
    else
    {
      formData.append('fileToUpload', fileToUpload, fileToUpload.name);
      formData.append('typeOfAd', 'accommodationAd');
      formData.append('ad',JSON.stringify(ad));

      returnValue = this.http.post<String>(`${this.url}/seller/add/accommodationAd`, formData);
    }

    return returnValue;
  }
}
