import { Component, OnInit } from '@angular/core';
import { Team } from '../model-objects/team';
import { BackendService } from '../backend.service';
import { Game } from '../model-objects/game';
import { Time } from '@angular/common';
import { GameDto } from '../model-objects/gameDto';
import { MatDialog } from '@angular/material/dialog';
import { NewTeamComponent } from './new-team/new-team.component';
import { GameStatusService } from '../game-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  constructor(private backendService: BackendService, private gameStatusService: GameStatusService, public newTeamDialog: MatDialog, private router: Router) { }

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
    this.dateSelect.setHours(parseInt(this.timeSelect.toString().split(":")[0]));
    this.dateSelect.setMinutes(parseInt(this.timeSelect.toString().split(":")[1]));

    let game: GameDto = {
      dateTime: this.dateSelect.getTime(),
      teamIds: [this.homeTeamSelect, this.guestTeamSelect]
    }

    this.backendService.createGame(game).subscribe({
      next: result => { 
        this.router.navigate(['/home']);
       }
    })
  }

  filterTeams() {
    if (this.homeTeamSelect == -1 || this.guestTeamSelect == -1) {
      let dialogRef = this.newTeamDialog.open(NewTeamComponent, {
        height: '400px',
        width: '600px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        if (this.homeTeamSelect == -1) {
          this.homeTeamSelect = result;
        } else {
          this.guestTeamSelect = result;
        }
      });
    }
    if (this.homeTeamSelect) {
      this.guestTeams = this.teams.filter(t => t.id != this.homeTeamSelect);
    }
    if (this.guestTeamSelect) {
      this.homeTeams = this.teams.filter(t => t.id != this.guestTeamSelect);
    }
  }
}