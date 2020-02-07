import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BackendService } from '../backend.service';
import { Event } from "../model-objects/event";
import { GameStatusService } from '../game-status.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-event-console',
  templateUrl: './event-console.component.html',
  styleUrls: ['./event-console.component.scss'],
})
export class EventConsoleComponent implements OnInit {

  events: Event[] = [{ id: 1, data: "example", dateTime: new Date() }];
  score: number[];
  scoreChangeDetector: ChangeDetectorRef;

  constructor(private gameStatusService: GameStatusService) { }

  ngOnInit() {
    this.events = [{ id: 1, data: "example", dateTime: new Date() }];

    this.score = [0, 0];

    this.gameStatusService.score$.subscribe({
      next: val => {
        this.score = val;
      },
      complete: () => {
        console.log("subscribe complete");
      }
    });

    let testSocket = webSocket({
      url: "ws://localhost:8080/webSocket"
    });

    testSocket.asObservable().subscribe(
      msg => console.dir(msg),
      err => console.dir(err),
      () => console.log("Websocket closed")
    );

    testSocket.next(new MessageEvent("string"));
  }
}
