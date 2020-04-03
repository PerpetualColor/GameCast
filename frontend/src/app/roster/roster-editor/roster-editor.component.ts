import { Component, OnInit, Inject, ViewChild, ElementRef, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/model-objects/team';
import { Player } from 'src/app/model-objects/player';
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { BackendService } from 'src/app/backend.service';
import { GameStatusService } from 'src/app/game-status.service';

@Component({
  selector: 'app-roster-editor',
  templateUrl: './roster-editor.component.html',
  styleUrls: ['./roster-editor.component.scss']
})
export class RosterEditorComponent implements OnInit {

  team: Team;
  playerNames: string[] = [];
  playerNumbers: number[] = [];
  inRange: number[] = [];
  canEditTeam: boolean = false;
  fileSelect: File;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<RosterEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private backendService: BackendService,
    private gameStatusService: GameStatusService) { }

  ngOnInit(): void {
    this.team = this.data.team;
    for (let p of this.team.players) {
      this.playerNames.push(p.name);
      this.playerNumbers.push(p.number);
      this.inRange.push(this.inRange.length);
    }
    this.playerNames.push("");
    this.playerNumbers.push(null);
    this.inRange.push(this.inRange.length);

    this.backendService.getCanEditTeam(this.team.id).subscribe({
      next: result => {
        this.canEditTeam = result.body;
      }
    });
  }

  onFileChange(event) {
    this.fileSelect = this.fileInput.nativeElement.files[0];
  }

  newName(): void {
    if (this.playerNames[this.playerNames.length-1] != "" || this.playerNumbers[this.playerNumbers.length-1] != null) {
      this.playerNames.push("");
      this.playerNumbers.push(null);
      this.inRange.push(this.inRange.length);
    }
  }

  submitChanges(): void {
    for (var i = 0; i < this.team.players.length; i++) {
      this.team.players[i].name = this.playerNames[i];
      this.team.players[i].number = this.playerNumbers[i];
    }
    for (var i = this.team.players.length; i < this.playerNames.length-1; i++) {
      if (this.playerNames[i] && this.playerNumbers[i]) {
        this.team.players.push({ id: -1, name: this.playerNames[i], number: this.playerNumbers[i], stats: null});
      }
    }

    this.backendService.uploadImage(this.team.id, this.fileSelect).subscribe({
      next: result => {
      }
    });

    this.backendService.updateRoster(this.team.players, this.team.id).subscribe({
      next: result => {
        this.dialogRef.close();
      }
    });
  }
}