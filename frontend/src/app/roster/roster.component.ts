import { Component, OnInit } from '@angular/core';
import { Team } from '../model-objects/team';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  guest: Team;
  home: Team;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getTeam(1).subscribe({
      next: result => { this.home = result.body;
      console.dir(this.home); }
    });
    this.backendService.getTeam(2).subscribe({
      next: result => { this.guest = result.body; 
      console.dir(this.guest); }
    });
  }

}
