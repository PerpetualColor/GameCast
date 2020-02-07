import { Component, OnInit } from '@angular/core';
import { Game } from '../model-objects/game';
import { GameStatusService } from '../game-status.service';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent implements OnInit {

  constructor(private gameStatusService: GameStatusService) { }

  game: Game;

  ngOnInit() {
    this.game = this.gameStatusService.game;
  }

}
