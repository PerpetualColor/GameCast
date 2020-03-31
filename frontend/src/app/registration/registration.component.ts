import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  username: string;
  password: string;
  matchPassword: string;

  ngOnInit(): void {
  }

  registerUser() {
    if (this.password == this.matchPassword) {
      this.backendService.registerUser({username: this.username, password: this.password}).subscribe(result => {
        console.dir(result.body);
      });
    }
  }

}
