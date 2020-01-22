import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit() {
  }

  getHelloMessage() {
    this.backendService.getHelloWorld().subscribe(result => {
      console.log(result.body);
    });
  }

}
