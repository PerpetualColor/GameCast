import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    private backendService: BackendService) { }

  username: string;
  password: string;

  ngOnInit(): void {
  }

  loginRequest(): void {
    this.backendService.requestLogin(this.username, this.password).subscribe({
      next: result => {
        this.dialogRef.close();
        console.dir(result.body);
      }
    });
  }
}