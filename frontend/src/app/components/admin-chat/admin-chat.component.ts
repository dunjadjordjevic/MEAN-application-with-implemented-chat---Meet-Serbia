import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';

import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/models/user.model';


const SOCKET_ENDPOINT = 'localhost:4444';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  socket;
  message: String; 
  messages: String[] = [];
  loggedUser: User;

  usersBuyers: User[];
  selectedUsername;
  buyerInConversation: String = '';
  dateAndTimeOfStart: Date;
  dateAndTimeOfEnd: Date;

  constructor(private chatService: ChatService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    //fetch all buyers
    this.usersBuyers = this.adminService.getAllBuyers().subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(respMessage.success)
      {
        this.usersBuyers = respMessage.bodyOfResponse;
       //console.log(this.usersBuyers);
      }
      else
      {
        this.usersBuyers= null;
      }
    },
    err => {
      console.log("Greska: dohvatanje informacija o svim kupcima iz baze nije uspelo");
      console.log(err.error);
    }
    );

    this.chatService
    .getMessages()
    .subscribe((messageObject) => {

      let usernameFrom;
      if(messageObject.from == null)
      {
        //primljena je genericka poruka jer je korisnik napustio 
        usernameFrom = 'UpoznajSrbiju';
      }
      else
      {
        if(messageObject.from.username!=this.loggedUser.username) this.buyerInConversation=messageObject.from.username;
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

    //this.buyerInConversation je username a NE USER!!!
    this.chatService.sendMessage(this.message, this.loggedUser, this.buyerInConversation);

    this.message = '';
  }

  endConversation()
  {
    //smesti u bazu konverzaciju 

    //cuvaj u bazi poruke
    let adminUsername= this.loggedUser.username;
    let buyerUsername = this.buyerInConversation;
    this.dateAndTimeOfEnd = new Date();
    alert("dateAndTimeOfEnd" + this.dateAndTimeOfEnd);

    this.adminService.saveConversation(adminUsername, buyerUsername, this.messages, this.dateAndTimeOfStart, this.dateAndTimeOfEnd).subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(!respMessage.success)
      {
        alert("Poruke nije moguće sačuvati. Konverzacija je završena!");
        console.log(respMessage.msg);
      }
    },
    err => {
      console.log("Greška pri cuvanju poruka za odabranu konverzaciju");
      console.log(err.error);
    });
    
    this.chatService.adminIsFree(this.loggedUser);

    const parent = document.getElementById("message-list");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }

    this.dateAndTimeOfEnd = null;
    this.dateAndTimeOfStart=null;
    this.buyerInConversation = '';
    this.messages = [];
  }
}
