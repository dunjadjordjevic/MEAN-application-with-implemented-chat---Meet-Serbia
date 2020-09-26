import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../../users.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  displayedColumns = ['name', 'surname', 'username', 'actions'];

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void
  {
    this.usersService.getAllUsers().subscribe( (data: User[]) => {
      this.users = data;
      console.log('Information about users:');
      console.log(this.users);
    } );
  }

  editUser(id) : void
  {
    //this.router.navigate([`/edit/${id}`]); 
  }

  deleteUser(id): void
  {
    // this.usersService.obrisiKorisnika(id).subscribe( () => {

    //   // da bi se updateova sadrzaj na stranici list, posle brisanja
    //   this.getAllUsers();
    // });
  }

}
