import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './model-objects/game';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class GameStatusService {

  public score$: Observable<number[]>;
  private score: number[] = [0, 0];

  public game: Game;

  scoreSubscriber() {
    const observers = [];

    // return the subscriber function
    return (observer) => {
      observers.push(observer);

      observers.forEach(obs => obs.next(this.score));

      // replace this with logic for receiving score updates
      function incScore(score) {
        score[0] += 1;
        score[1] += 2;
      }
      setInterval(() => {
        incScore(this.score);
        observers.forEach(obs => obs.next(this.score));
      }, 1000);

      return {
        unsubscribe() {
          observers.splice(observers.indexOf(observer), 1);
        }
      }
    }

    // return the unsubscribe function
    
  }

  public selectGame(gameId: number) {
    this.backendService.getGame(gameId).subscribe({
      next: result => { this.game = result.body; console.log("Fetched"); }
    });
  }

  parseEvent(event: Event) {
    
  }

  constructor(private backendService: BackendService) {
    this.score$ = new Observable(this.scoreSubscriber());
  }
}
