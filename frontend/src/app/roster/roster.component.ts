import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  displayedColumns: string[] = ['number', 'name', 'scores', 'fouls', 'rebounds'];
  homeDataSource: Player[] = [
    {id: -1, name: "James Xu", number: 1, stats: {scores: [7], fouls: 7, rebounds: 7}},
    {id: -1, name: "James Xu", number: 1, stats: {scores: [8], fouls: 8, rebounds: 8}},
    {id: -1, name: "James Xu", number: 1, stats: {scores: [9], fouls: 9, rebounds: 9}},
    {id: -1, name: "James Xu", number: 1, stats: {scores: [10], fouls: 2, rebounds: 10}},
    {id: -1, name: "James Xu", number: 1, stats: {scores: [34], fouls: 5, rebounds: 7}},
    {id: -1, name: "James Xu", number: 1, stats: {scores: [12], fouls: 11, rebounds: 3}},
    {id: -1, name: "James Xu", number: 1, stats: {scores: [13], fouls: 826, rebounds: 2}},
    {id: -1, name: "James Xu", number: 1, stats: {scores: [14], fouls: 9, rebounds: 24}}
  ];

  guestDataSource: Player[];

  homeRoster: Player[];

  constructor(private backendService: BackendService, 
    private gameStatusService: GameStatusService, 
    public editorDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.home = this.gameStatusService.game.teams[0];
    this.guest = this.gameStatusService.game.teams[1];
    
    this.homeDataSource = this.gameStatusService.game.teams[0].players;
    this.guestDataSource = this.gameStatusService.game.teams[1].players;

    for (let player of this.homeDataSource) {
      if (!player.stats) {
        player.stats = {scores: [], fouls: 0, rebounds: 0};
      }
    }

    for (let player of this.guestDataSource) {
      if (!player.stats) {
        player.stats = {scores: [], fouls: 0, rebounds: 0};
      }
    }

    this.gameStatusService.events$.subscribe({
      next: result => {
        this.changeDetectorRef.detectChanges();
      }
    })
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
      this.ngOnInit();
      this.changeDetectorRef.detectChanges();
    });
  }

}
