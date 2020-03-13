import { Component, OnInit } from '@angular/core';
import { Team } from '../model-objects/team';
import { BackendService } from '../backend.service';
import { GameStatusService } from '../game-status.service';
import { Player } from '../model-objects/player';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  guest: Team;
  home: Team;

  homeRoster: Player[];
  guestRoster: Player[];

  constructor(private backendService: BackendService, private gameStatusService: GameStatusService) { }

  ngOnInit() {
    let homeID = this.gameStatusService.game.teams[0].id;
    let guestID = this.gameStatusService.game.teams[1].id;
    this.backendService.getTeam(homeID).subscribe({
      next: result => { 
        this.home = result.body;
        console.dir(this.home);
        this.homeRoster = result.body.players;
       }
    });
    this.backendService.getTeam(guestID).subscribe({
      next: result => { 
        this.guest = result.body;
        this.guestRoster = result.body.players;
       }
    });
  }

  

}
