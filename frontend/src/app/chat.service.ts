import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:4444';

  private socket;
  loggedUser: User;

  constructor() { 
    
    var data;
    this.socket = io(this.url);
    
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    
    this.socket.on('connect', () => {
      data = {username: this.loggedUser.username, id: this.socket.id};
      this.socket.emit('setSocketId', data);
   });

   
  }

  public sendMessage(message, loggedUser, toUserUsername) {

    if(loggedUser.typeOfUser=='buyer')
    {
      // console.log("poruku salje kupac");
      // console.log( {message: message, from: loggedUser.username , to: 'dunjadj_', timeOfSending: time});
       this.socket.emit('new-message', {message: message, from: loggedUser, to: ''});
    }
    else 
    if(loggedUser.typeOfUser=='admin')
    {
      // console.log("poruku salje admin");
      // console.log( {message: message, from: loggedUser.username , to: 'veljkodj_', timeOfSending: time});
      this.socket.emit('new-message', {message: message, from: loggedUser , to: toUserUsername});
    }  
  }

  

  public getMessages = () => {
    return Observable.create((observer) => {

        this.socket.on('new-message', (message) => {
            observer.next(message);
        });
  });
  }

  public adminIsFree(userAdmin)
  {
    //admin je zavrsio konverzaciju, treba da se vrati u red slobodni h
    this.socket.emit('admin-is-free', {admin: userAdmin});
  }

 
}