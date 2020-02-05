import { Component, OnInit } from '@angular/core';
import { Team } from '../model-objects/team';
import { BackendService } from '../backend.service';
import { Game } from '../model-objects/game';
import { Time } from '@angular/common';
import { GameDto } from '../model-objects/gameDto';

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

  dateSelect: Date;
  timeSelect: Time;

  ngOnInit() {
    this.backendService.getAllTeams().subscribe({
      next: result => {
        this.teams = result.body;
        this.homeTeams = this.teams;
        this.guestTeams = this.teams;
      }
    });
  }

  createGame() {
    this.dateSelect.setHours(this.timeSelect.hours);
    this.dateSelect.setMinutes(this.timeSelect.minutes);

    let game: GameDto = {
      dateTime: this.dateSelect.getTime(),
      teamIds: [this.homeTeamSelect, this.guestTeamSelect]
    }

    this.backendService.createGame(game).subscribe({
      next: result => { console.log(result); }
    })
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
