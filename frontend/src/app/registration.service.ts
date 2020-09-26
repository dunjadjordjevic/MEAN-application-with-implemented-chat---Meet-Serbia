import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  url : string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  register(fileToUpload: File, user: User): Observable<String>
  {
    const formData: FormData = new FormData();

    //sending two key-value pairs with post request
    formData.append('profilePicture', fileToUpload, fileToUpload.name);
    formData.append('user',JSON.stringify(user));
    // return this.http.post<String>(`${this.url}/registration/register_user`,user);
    return this.http.post<String>(`${this.url}/registration/register_user`,formData);
  }
}
