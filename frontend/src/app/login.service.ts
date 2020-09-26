import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  url : string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  login(user): Observable<User>
  {
    return this.http.post<User>(`${this.url}/login`, user);
  }

  changePassword(username: String, newPassword: String)
  {
    return this.http.post(`${this.url}/login/change-password`, { username: username, newPassword: newPassword});
  }

  fetchUserWithUsername(username)
  {
    return this.http.post(`${this.url}/login/fetchUser`, { username: username});
  }

  updateUserProperty(username: String, property: String, newValue:String)
  {
    return this.http.post(`${this.url}/login/updateUserProfile`, { username: username, property: property, value: newValue});
  }
}
