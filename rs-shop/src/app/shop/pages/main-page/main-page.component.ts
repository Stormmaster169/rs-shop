import { Component, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/models/app-models.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public userInfo : IUserInfo;

  constructor( private userService : UserService) {}

  public ngOnInit(): void {

  }

  public onTest(event : Event) {
    event.preventDefault();
    this.userService.getUserInfo().subscribe((res) => this.userInfo = res)
  }

  public onDelete(event : Event) {
    event.preventDefault();
    this.userService.deleteItemFromCart('612d43651a5bfcf3f451e492').subscribe((res) => res)
  }

}
