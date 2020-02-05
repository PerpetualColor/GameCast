import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStatusService {

  public score$: Observable<number[]>;
  private score: number[] = [0, 0];

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

  parseEvent(event: Event) {
    
  }

  constructor() {
    this.score$ = new Observable(this.scoreSubscriber());
  }
}
