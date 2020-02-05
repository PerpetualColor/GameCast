import { Component, OnInit } from '@angular/core';
import { Team } from '../model-objects/team';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  teams: Team[];
  homeTeams: Team[];
  guestTeams: Team[];

  homeTeamSelect: number;
  guestTeamSelect: number;

  ngOnInit() {
    this.backendService.getAllTeams().subscribe({
      next: result => {
        this.teams = result.body;
        this.homeTeams = this.teams;
        this.guestTeams = this.teams;
      }
    });
  }

  filterTeams() {
    if (this.homeTeamSelect) {
      this.guestTeams = this.teams.filter(t => t.id != this.homeTeamSelect);
    }
    if (this.guestTeamSelect) {
      this.homeTeams = this.teams.filter(t => t.id != this.guestTeamSelect);
    }
  }

}
