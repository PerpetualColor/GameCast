import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Game } from './model-objects/game';
import { BackendService } from './backend.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Event } from './model-objects/event';
import { ParseEvent } from './model-objects/parseEvent';

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
    // return the unsubscribe function

  }



  // to print an object with formatting: console.dir(obj);
  //list of reg exp matches, if doesnt match return null
  // node for live interpreter
  parseEvent(event: Event): ParseEvent {
    var pEvent: ParseEvent = new ParseEvent;
    var eventData: string = event.data;

    // sets the data of the event to the to origEvent
    pEvent.origEvent = eventData;

    //player scores amount x
    //syntax = PlayerNum,Team s Amount
    var scoreMatch = new RegExp("([0-9]+[a-zA-Z]) (s) ([0-9]+)");
    
    //player fouls
    //syntax = PlayerNum,Team f 
    var foulMatch = new RegExp("([0-9]+[a-zA-Z]) (f)");
    
    //player rebounds
    //syntax = PlayerNum,Team r
    var reboundMatch = new RegExp("([0-9]+[a-zA-Z]) (r)");

    //player makes free throw
    //syntax = PlayerNum,Team fT
    var freeThrowMatch = new RegExp("([0-9]+[a-z]) (fT)");

    let array;

    //if player scores
    if((array = scoreMatch.exec(eventData))) {
      let pEvent = {
        type: "scores",
        amount: parseInt(array[3]),
        player: array[1],
        origEvent: eventData
      }
      return pEvent;
    }
    //if player makes freeThrow
    //syntax: PlayerNum,Team fT
    else if((array = freeThrowMatch.exec(eventData))){
      let pEvent = {
        type: "free throw",
        amount: 1,
        player: array[1],
        origEvent: eventData
      }
      return pEvent;
    }
    //if player fouls
    else if((array = foulMatch.exec(eventData))){
      let pEvent = {
        type: "fouls",
        amount: null,
        player: array[1],
        origEvent: eventData
      }
      return pEvent;
    }
    //if player rebounds
    else if((array = reboundMatch.exec(eventData))){
      let pEvent = {
        type: "rebounds",
        amount: null,
        player: array[1],
        origEvent: eventData
      }
      return pEvent;
    }
    

    else{
      return null;
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
