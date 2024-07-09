import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { UserDetail } from '../../interfaces/user-detail';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  userServices = inject(UserService);
  user: UserDetail | null = null;
  
  ngOnInit(): void {
    this.getAuthUser();
  }

  getAuthUser(){
    this.userServices.getUserLoggedIn().subscribe(({
      next: (res : any) => {
        this.user = res.user;
      },
      error: (error) => {
        console.log("Error fetching user: ", error);
      }
    }));
  }
}
