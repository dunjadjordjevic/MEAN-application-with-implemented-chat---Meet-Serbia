import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getAllUsers()
  {
    return this.http.get(`${this.uri}/users`);
  }

  // editUser(id)
  // {

  // }

  // deleteUser(id)
  // {

  // }
}
