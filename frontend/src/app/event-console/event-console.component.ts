import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import { Event } from "../model-objects/event";
import { GameStatusService } from '../game-status.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ParseEvent } from '../model-objects/parseEvent';
import { ArgumentOutOfRangeError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizeOperatorComponent } from './authorize-operator/authorize-operator.component';

@Component({
  selector: 'app-event-console',
  templateUrl: './event-console.component.html',
  styleUrls: ['./event-console.component.scss'],
})
export class EventConsoleComponent implements OnInit {

  events: Event[];
  scoreChangeDetector: ChangeDetectorRef;
  readyData: string;
  badEvent: boolean;

  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewPort: CdkVirtualScrollViewport;

  canControl: boolean = false;
  
  constructor(private gameStatusService: GameStatusService, private backendService: BackendService, public authDialog: MatDialog) { }

  ngOnInit() {
    this.badEvent = false;
    this.events = this.gameStatusService.game.events.sort((a, b) => b.dateTime - a.dateTime);
    for (let e of this.events) {
      e.dateTime = new Date(e.dateTime);
    }

    this.gameStatusService.events$.subscribe({
      next: val => {
        this.events = [val].concat(this.events);
      }
    });

    this.gameStatusService.canControlGame$.subscribe({
      next: result => {
        this.canControl = result;
      }
    })
  }

  ngAfterViewInit() {
    this.viewPort.scrollToIndex(this.events.length, "smooth");
  }

  readableEvent(event: Event): string {
    let output = "";
    let parsedEvent: ParseEvent;
    if ((parsedEvent = this.gameStatusService.parseEvent(event))) {
      var playerMatch = new RegExp("([0-9]+)([hg])");

      let m;
      if (parsedEvent.player) {
        m = playerMatch.exec(parsedEvent.player);
        if (m[2] == "h") {
          output += "Home ";
        } else {
          output += "Guest ";
        }
        output += m[1];
        let playerNameSearch = this.gameStatusService.game.teams[(m[2] == "h" ? 0 : 1)].players.filter(p => p.number == parseInt(m[1]));
        if (playerNameSearch.length > 0) {
          output += " (" + playerNameSearch[0].name + ") ";
        }
      }
      switch (parsedEvent.type) {
        case "scores":
          output += " scores " + parsedEvent.amount + " points!";
          break;
        case "free throw":
          output += " earns a free throw!";
          break;
        case "fouls":
          output += " fouls!";
          break;
        case "rebounds":
          output += " gets the rebound!";
          break;
        case "start game":
          output += "The game begins!"
          break;
        case "period":
          output += "Now in period " + parsedEvent.amount;
          break;
        case "next period":
          output += "End of period"
          break;
        case "custom message":
          output += parsedEvent.extra;
          break;
      }
    } else {
      output += "Invalid event";
    }
    return output;
  }

  submitEvent() {
    // this.backendService.createAndAddEvent(this.readyData, new Date().getTime(), this.gameStatusService.game.id).subscribe({
    //   next: result => {
    //     this.readyData = "";
    //   }
    // });
    let parsedEvent = this.gameStatusService.parseEvent({ id: -1, dateTime: new Date().getTime(), data: this.readyData });
    if (parsedEvent) {
      this.backendService.createAndAddEvent(this.readyData, new Date().getTime(), this.gameStatusService.game.id).subscribe({
        next: result => {
          this.readyData = "";
          this.badEvent = false;
        }
      });
    } else {
      this.badEvent = true;
    }
  }

  authorizeNew() {
    let dialogRef = this.authDialog.open(AuthorizeOperatorComponent, {
      height: '600px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
