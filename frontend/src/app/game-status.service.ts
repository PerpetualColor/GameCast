import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './model-objects/game';
import { BackendService } from './backend.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Event } from './model-objects/event';

@Injectable({
  providedIn: 'root'
})
export class GameStatusService {

  public score$: Observable<number[]>;
  private score: number[] = [0, 0];
  private gameSocket: WebSocketSubject<any>;

  public game: Game;

  incScore(score) {
    score[0] += 1;
    score[1] += 2;
  }

  scoreSubscriber() {
    const observers = [];

    setInterval(() => {
      this.incScore(this.score);
      observers.forEach(obs => obs.next(this.score));
    }, 1000);

    // return the subscriber function
    return (observer) => {
      observers.push(observer);

      observers.forEach(obs => obs.next(this.score));

      // replace this with logic for receiving score updates


      return {
        unsubscribe() {
          observers.splice(observers.indexOf(observer), 1);
        }
      }
    }

    // return the unsubscribe function

  }

  public selectGame(game: Game) {
    this.game = game;
    if (!this.gameSocket) {
      this.gameSocket = webSocket({
        url: "ws://localhost:8080/webSocket"
      });
    }
    this.gameSocket.asObservable().subscribe(
      msg => console.dir(msg)
    );
    this.gameSocket.next(game.id);
  }

  parseEvent(event: Event) {

  }

  constructor(private backendService: BackendService) {
    this.score$ = new Observable(this.scoreSubscriber());
  }
}
