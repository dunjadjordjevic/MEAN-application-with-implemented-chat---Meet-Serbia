import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url : string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  fetchWaitingProductAds()
  {
    var returnValue; 

    returnValue = this.http.get(`${this.url}/admin/productAdsForCheck`);

    return returnValue;
  }

  fetchWaitingAccommodationAds()
  {
    var returnValue; 

    returnValue = this.http.get(`${this.url}/admin/accommodationAdsForCheck`);

    return returnValue;
  }

  getAllBuyers()
  {
    var returnValue; 

    returnValue = this.http.get(`${this.url}/admin/usersBuyers`);

    return returnValue;
  }

  approveAdWithTypeAndId(typeOfAd:String, id)
  {
    var returnValue;
    if (typeOfAd=='productAd')
    {
      returnValue = this.http.post(`${this.url}/admin/approveProductAd`, {id : id});
    }
    else
    {
      returnValue = this.http.post(`${this.url}/admin/approveAccommodationAd`, {id : id});
    }

    return returnValue;
  }

  declineAdWithTypeAndId(typeOfAd:String, id)
  {
    var returnValue;
    if (typeOfAd=='productAd')
    {
      returnValue = this.http.delete(`${this.url}/admin/declineProductAd?id=${id}`);
    }
    else
    {
      returnValue = this.http.delete(`${this.url}/admin/declineAccommodationAd?id=${id}`);
    }

    return returnValue;
  }

  getMessagesInConversation(adminUsername, buyerUsername)
  {
    var returnValue; 

    returnValue = this.http.post(`${this.url}/admin/messages`, {adminUsername : adminUsername, buyerUsername: buyerUsername});

    return returnValue;
  }

  saveConversation(adminUsername, buyerUsername, messages, dateAndTimeOfStart, dateAndTimeOfEnd)
  {
    var returnValue; 

    returnValue = this.http.post(`${this.url}/admin/saveConversation`, {adminUsername : adminUsername, buyerUsername: buyerUsername, messages: messages, dateAndTimeOfStart:dateAndTimeOfStart, dateAndTimeOfEnd: dateAndTimeOfEnd});

    return returnValue;
  }
}
