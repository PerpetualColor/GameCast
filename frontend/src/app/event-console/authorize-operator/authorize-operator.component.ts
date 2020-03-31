import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from 'src/app/backend.service';
import { GameStatusService } from 'src/app/game-status.service';

@Component({
  selector: 'app-authorize-operator',
  templateUrl: './authorize-operator.component.html',
  styleUrls: ['./authorize-operator.component.scss']
})
export class AuthorizeOperatorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AuthorizeOperatorComponent>, 
    private backendService: BackendService,
    private gameStatusService: GameStatusService) { }

  username: string = "";

  ngOnInit(): void {
  }

  authRequest() {
    this.backendService.addAuthorizedUser(this.username, this.gameStatusService.game.id).subscribe({
      next: result => {
        this.dialogRef.close();
      }
    });
  }

}
