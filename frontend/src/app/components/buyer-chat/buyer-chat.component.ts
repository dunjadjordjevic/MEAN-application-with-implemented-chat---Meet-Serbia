import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import {ChatService} from '../../chat.service';
import { User } from 'src/app/models/user.model';

const SOCKET_ENDPOINT = 'localhost:4444';

@Component({
  selector: 'app-buyer-chat',
  templateUrl: './buyer-chat.component.html',
  styleUrls: ['./buyer-chat.component.css']
})
export class BuyerChatComponent implements OnInit {

  
  socket;
  message: String; 
  messages: String[] = [];
  loggedUser: User;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    this.chatService
    .getMessages()
    .subscribe((messageObject) => {

      let usernameFrom;
      if(messageObject.from == null)
      {
        //znaci da nije bilo slobodnih admina, pa je primljena genericka poruka
        usernameFrom = 'UpoznajSrbiju';
      }
      else
      {
       usernameFrom = messageObject.from.username;
      }

      this.messages.push(usernameFrom + " :   " + messageObject.message);

      const element = document.createElement('li');
      element.innerHTML = usernameFrom + " :   " +messageObject.message;
      element.style.background = '#14213D';
      element.style.color='white';
      element.style.padding =  '15px 30px';
      element.style.margin = '10px';
      document.getElementById('message-list').appendChild(element);
    });
  }

  sendMessage()
  {
    var date = new Date;
    date.setTime(date.getTime());

    var minutes = date.getMinutes();
    var hour = date.getHours();

    var time = "" + hour + ":" + minutes ;

    //poruka koja se salje, User koji salje poruku i username usera koji treba da primi poruku (kada salje buyer on ne zna kome ide poruka)

    this.chatService.sendMessage(this.message, this.loggedUser, '');
  
    this.message = '';
  }

}
