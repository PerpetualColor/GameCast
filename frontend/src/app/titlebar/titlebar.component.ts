import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

  constructor(public loginDialog: MatDialog, private backendService: BackendService) { }

  username: string;

  ngOnInit() {
    this.backendService.getLoggedIn().subscribe({
      next: result => {
        this.username = result.body;
      },
      error: result => {
      }
    });
  }

  openLoginDialog() {
    let dialogRef = this.loginDialog.open(LoginDialogComponent, {
      height: '600px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  logout() {
    this.backendService.logout().subscribe({
      next: result => {
        this.ngOnInit();
      }
    });
  }

}
