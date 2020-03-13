import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { GameStatusService } from '../game-status.service';
import { Game } from '../model-objects/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private backendService: BackendService, private gameStatusService: GameStatusService, private router: Router) { }

  games: Game[];

  ngOnInit() {
    this.backendService.getAllGames().subscribe({
      next: result => {
        this.games = result.body;
      }
    });
  }

  getHelloMessage() {
    console.dir(this.gameStatusService.parseEvent({id: -1, dateTime: new Date(), data: "14h f"}));
  }

  setGameAndRedirect(game: Game) {
    this.gameStatusService.selectGame(game);
    this.router.navigate([ "/gamecast" ]);

  }

}
