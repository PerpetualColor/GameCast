import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Team } from '../model-objects/team';
import { BackendService } from '../backend.service';
import { GameStatusService } from '../game-status.service';
import { Player } from '../model-objects/player';
import { RosterEditorComponent } from './roster-editor/roster-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerStats } from '../model-objects/playerstats';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  guest: Team;
  home: Team;
  displayedColumns: string[] = ['number', 'name', 'scores', 'fouls', 'rebounds'];
  homeDataSource: MatTableDataSource<Player>;
  guestDataSource: MatTableDataSource<Player>;

  canControl: boolean = false;

  constructor(private backendService: BackendService, 
    private gameStatusService: GameStatusService, 
    public editorDialog: MatDialog) { }

  ngOnInit() {
    this.home = this.gameStatusService.game.teams[0];
    this.guest = this.gameStatusService.game.teams[1];

    this.gameStatusService.events$.subscribe({
      next: _ => {
        this.updateTable();
      }
    });

    this.gameStatusService.updateData$.subscribe({
      next: _ => {
        this.updateTable();
      }
    });

    this.gameStatusService.canControlGame$.subscribe({
      next: result => {
        this.canControl = result;
      }
    })
    
    this.updateTable();
  }

  updateTable() {
    this.homeDataSource = new MatTableDataSource(this.gameStatusService.game.teams[0].players);
    this.guestDataSource = new MatTableDataSource(this.gameStatusService.game.teams[1].players);

    for (let player of this.homeDataSource.data) {
      if (!player.stats) {
        player.stats = {scores: [], fouls: 0, rebounds: 0};
      }
    }

    for (let player of this.guestDataSource.data) {
      if (!player.stats) {
        player.stats = {scores: [], fouls: 0, rebounds: 0};
      }
    }
  }
  
  sumArray(numbers: number[]): number {
    return numbers.reduce((a,b)=>a+b, 0);
  }

  openEditorDialog(team: Team) {
    let dialogRef = this.editorDialog.open(RosterEditorComponent, {
      height: '400px',
      width: '600px',
      data: { team: team}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gameStatusService.updateTeam();
      this.updateTable();
    });
  }

}
