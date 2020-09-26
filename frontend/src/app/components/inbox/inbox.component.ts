import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/admin.service';
import { Location } from '@angular/common';
import {Log} from 'src/app/models/log.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  users: User[] = [];
  selectedUsername: String;
  loggedUser: User=null;

  logs: Log[] = null;

  constructor(private location: Location, private adminService: AdminService) { }

  ngOnInit(): void {

    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.fetchAllBuyers();

  }

  back()
  {
    this.location.back();
  }

  fetchAllBuyers()
  {
    
    this.adminService.getAllBuyers().subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      
      if(respMessage.success)
      {
        this.users = respMessage.bodyOfResponse;
      }
      else
      {
        this.users= [];
      }
      
    },
    err => {
      console.log("Greška pri dohvatanju informacija za korisnike kupce");
      console.log(err.error);
    }
    );
  
  }

  seeMessagesWith(username: String)
  {
    //dohvati iz baze poruke sa tim buyerom ciji je username username
    //a pritom da su moje poruke -> dakle da je adminusername = loggedUser.username
    let adminUsername = this.loggedUser.username;
    let buyerUsername = username; 

    this.adminService.getMessagesInConversation(adminUsername, buyerUsername).subscribe( data => {
      let respMessage: any;
      respMessage = data; 

      if(respMessage.success)
      {
        //proveri da li je prazno i ako jeste prikazi open. ..
        
        this.logs = respMessage.bodyOfResponse;

      }
      else
      {
        this.logs= [];
      }
      
    },
    err => {
      console.log("Greška pri dohvatanju poruka za odabranu konverzaciju");
      console.log(err.error);
    }
    );
  }

  

}
