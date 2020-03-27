import { Component, OnInit } from '@angular/core';
import { Team } from '../model-objects/team';
import { BackendService } from '../backend.service';
import { GameStatusService } from '../game-status.service';
import { Player } from '../model-objects/player';
import { RosterEditorComponent } from './roster-editor/roster-editor.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  guest: Team;
  home: Team;

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
