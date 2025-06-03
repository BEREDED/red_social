import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-prin-prin',
  templateUrl: './prin-prin.component.html',
  styleUrls: ['./prin-prin.component.scss'],
  standalone:false
})
export class PrinPrinComponent  implements OnInit {
  email: string = '';

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.userDataService.currentEmail.subscribe(email => {
      this.email = email;
      console.log('Email received in prin-prin:', this.email);
    });
  }
}
