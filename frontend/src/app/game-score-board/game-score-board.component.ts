import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Event } from "../model-objects/event";
import { GameStatusService } from '../game-status.service';

@Component({
  selector: 'app-game-score-board',
  templateUrl: './game-score-board.component.html',
  styleUrls: ['./game-score-board.component.scss']
})
export class GameScoreBoardComponent implements OnInit {


  events: Event[];
  score: number[];
  scoreChangeDetector: ChangeDetectorRef;
  fouls: number[];
  period: number;

  homeName: string;
  guestName: string;

  constructor(private gameStatusService: GameStatusService) { }
  ngOnInit() {

    this.score = [0, 0];
    this.fouls = [0, 0];

    this.homeName = this.gameStatusService.game.teams[0].name;
    this.guestName = this.gameStatusService.game.teams[1].name;

    this.gameStatusService.score$.subscribe({
      next: val => {
        this.score = val;
      },
      complete: () => {
        console.log("subscribe complete");
      }
    });

    this.gameStatusService.foul$.subscribe({
      next: val => {
        this.fouls = val;
      },
      complete: () => {
        console.log("subscribe complete");
      }
    });

    this.gameStatusService.period$.subscribe({
      next: val => {
        this.period = val;
      },
      complete: () => {
        console.log("subscribe complete");
      }
    })
  }
}
