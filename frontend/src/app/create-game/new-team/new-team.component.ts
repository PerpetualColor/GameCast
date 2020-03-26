import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RosterEditorComponent } from 'src/app/roster/roster-editor/roster-editor.component';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RosterEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private backendService: BackendService) { }

  name: string = "";

  ngOnInit(): void {
  }

  createTeam(): void {
    this.backendService.createTeam(this.name).subscribe({
      next: result => {
        this.dialogRef.close(parseInt(result.body));
      }
    });
  }
  
}
