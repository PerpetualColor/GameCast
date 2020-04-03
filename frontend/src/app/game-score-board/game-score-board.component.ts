import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Event } from "../model-objects/event";
import { GameStatusService, UpdateType } from '../game-status.service';
import { BackendService } from '../backend.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  homeImage: any;
  guestImage: any;

  constructor(private gameStatusService: GameStatusService, private backendService: BackendService, private sanitizer: DomSanitizer) { }
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
    });

    this.fetchImages();

    this.gameStatusService.updateData$.subscribe({
      next: result => {
        if (result === UpdateType.Images) {
          this.fetchImages;
        }
      }
    });
  }

  fetchImages() {
    console.log("Fetching images");
    this.backendService.getImage(this.gameStatusService.game.teams[0].id).subscribe(data => {
      this.createImageFromBlob(data, "home");
    });
    this.backendService.getImage(this.gameStatusService.game.teams[1].id).subscribe(data => {
      this.createImageFromBlob(data, "guest");
    });
  }

  createImageFromBlob(image: Blob, team: string) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      switch (team) {
        case "home":
          this.homeImage = reader.result;
          break;
        case "guest":
          this.guestImage = reader.result;
          break;
      }
    }, false);
  }
}
