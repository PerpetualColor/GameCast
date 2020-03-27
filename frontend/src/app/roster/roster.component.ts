import { Component, OnInit } from '@angular/core';
import { Team } from '../model-objects/team';
import { BackendService } from '../backend.service';
import { GameStatusService } from '../game-status.service';
import { Player } from '../model-objects/player';
import { RosterEditorComponent } from './roster-editor/roster-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerStats } from '../model-objects/playerstats';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  guest: Team;
  home: Team;
  displayedColumns: string[] = ['scores', 'fouls', 'rebounds'];
  dataSource: PlayerStats[] = [
    {scores: [7], fouls: 7, rebounds: 7},
    {scores: [8], fouls: 8, rebounds: 8},
    {scores: [9], fouls: 9, rebounds: 9},
    {scores: [10], fouls: 2, rebounds: 10},
    {scores: [34], fouls: 5, rebounds: 7},
    {scores: [12], fouls: 11, rebounds: 3},
    {scores: [13], fouls: 826, rebounds: 2},
    {scores: [14], fouls: 9, rebounds: 24}
  ];

  homeRoster: Player[];

  constructor(private backendService: BackendService, private gameStatusService: GameStatusService, public editorDialog: MatDialog) { }

  ngOnInit() {
    this.home = this.gameStatusService.game.teams[0];
    this.guest = this.gameStatusService.game.teams[1];
    

   
  }
  

  openEditorDialog(team: Team) {
    let dialogRef = this.editorDialog.open(RosterEditorComponent, {
      height: '400px',
      width: '600px',
      data: { team: team}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gameStatusService.updateTeam();
    });
  }

}
