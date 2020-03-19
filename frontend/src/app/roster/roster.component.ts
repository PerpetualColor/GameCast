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

  constructor(private backendService: BackendService, private gameStatusService: GameStatusService) { }

  ngOnInit() {
    this.home = this.gameStatusService.game.teams[0];
    this.guest = this.gameStatusService.game.teams[1];
  }

  

}
