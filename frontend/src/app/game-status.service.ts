import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Game } from './model-objects/game';
import { BackendService } from './backend.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Event } from './model-objects/event';

@Injectable({
  providedIn: 'root'
})
export class GameStatusService {

  public score$: Subject<number[]>;
  public events$: Subject<Event>;
  public foul$: Subject<number[]>;
  private score: number[] = [0, 0];
  private fouls: number[] = [0,0];
  private gameSocket: WebSocketSubject<any>;

  public game: Game;

  incScore(score, fouls) {
    score[0] += 1;
    score[1] += 2;
    fouls[0] += 1;
    fouls[1] += 1;

    console.log(this.backendService.baseUrl);
  }

 

  eventSubscriber() {
    const observers = [];
    
    return (observer) => {
      observers.push(observer);

      return {
        unsubscribe() {
          observers.splice(observers.indexOf(observer), 1);
        }
      }
    }
  }

  public selectGame(game: Game) {
    this.game = game;
    if (!this.gameSocket) {
      this.gameSocket = webSocket({
        url: "ws://localhost:8080/webSocket"
      });
    }
    this.gameSocket.asObservable().subscribe(
      msg => { 
        console.dir(msg);
        this.events$.next(msg as Event);
      }
    );
    this.gameSocket.next(game.id);
  }

  parseEvent(event: Event) {

  }

  constructor(private backendService: BackendService) {
    this.score$ = new Subject();
    this.foul$ = new Subject();
    setInterval(() => {
      this.incScore(this.score, this.fouls);
      this.score$.next(this.score);
      this.foul$.next(this.fouls);
    }, 1000);

    this.events$ = new Subject();
  }
}
