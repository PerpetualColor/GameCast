import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import { Event } from "../model-objects/event";
import { GameStatusService } from '../game-status.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-event-console',
  templateUrl: './event-console.component.html',
  styleUrls: ['./event-console.component.scss'],
})
export class EventConsoleComponent implements OnInit {

  events: Event[];
  scoreChangeDetector: ChangeDetectorRef;
  readyData: string;

  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewPort: CdkVirtualScrollViewport;

  constructor(private gameStatusService: GameStatusService, private backendService: BackendService) { }

  ngOnInit() {
    this.events = this.gameStatusService.game.events.sort((a, b) => b.dateTime - a.dateTime);
    for (let e of this.events) {
      e.dateTime = new Date(e.dateTime);
    }

    this.gameStatusService.events$.subscribe({
      next: val => {
        this.events = [val].concat(this.events);
      }
    })
  }

  ngAfterViewInit() {
    this.viewPort.scrollToIndex(this.events.length, "smooth");
    console.log("Scroll");
  }

  submitEvent() {
    this.backendService.createAndAddEvent(this.readyData, new Date().getTime(), this.gameStatusService.game.id).subscribe({
      next: result => {
        this.readyData = "";
      }
    });
  }
}
