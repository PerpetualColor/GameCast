import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Event } from "../model-objects/event";
import { GameStatusService } from '../game-status.service';

@Component({
  selector: 'app-game-score-board',
  templateUrl: './game-score-board.component.html',
  styleUrls: ['./game-score-board.component.scss']
})
export class GameScoreBoardComponent implements OnInit {


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
  }
}
