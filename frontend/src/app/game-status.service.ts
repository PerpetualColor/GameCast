import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Game } from './model-objects/game';
import { BackendService } from './backend.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Event } from './model-objects/event';
import { ParseEvent } from './model-objects/parseEvent';
import { Player } from './model-objects/player';

@Injectable({
  providedIn: 'root'
})
export class GameStatusService {

  public score$: Subject<number[]>;
  public events$: Subject<Event>;
  public foul$: Subject<number[]>;
  public period$: Subject<number>;

  private score: number[] = [0, 0];
  private fouls: number[] = [0, 0];
  private period: number;
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
    var scoreMatch = new RegExp("^([0-9]+[hg]) (s) ([0-9]+)$");

    //player fouls
    //syntax = PlayerNum,Team f 
    var foulMatch = new RegExp("^([0-9]+[hg]) (f)$");

    //player rebounds
    //syntax = PlayerNum,Team r
    var reboundMatch = new RegExp("^([0-9]+[hg]) (r)$");

    //player makes free throw
    //syntax = PlayerNum,Team fT
    var freeThrowMatch = new RegExp("^([0-9]+[hg]) (fT)$");

    // start of the game
    // syntax: sg
    var startGameMatch = new RegExp("^sg$");

    // choose the period of the game
    // syntax: p,Num
    var periodMatch = new RegExp("^p([0-9]+)$");

    // continue to the next period
    // syntax: np
    var nextPeriodMatch = new RegExp("^np$");

    // send a custom message in the event list
    // syntax: cm MESSAGE
    var customMessageMatch = new RegExp("^cm (.*$)");

    let array;

    //if player scores
    if ((array = scoreMatch.exec(eventData))) {
      let pEvent = {
        type: "scores",
        amount: parseInt(array[3]),
        player: array[1],
        origEvent: eventData,
        extra: null
      }
      return pEvent;
    }
    //if player makes freeThrow
    //syntax: PlayerNum,Team fT
    else if ((array = freeThrowMatch.exec(eventData))) {
      let pEvent = {
        type: "free throw",
        amount: 1,
        player: array[1],
        origEvent: eventData,
        extra: null
      }
      return pEvent;
    }
    //if player fouls
    else if ((array = foulMatch.exec(eventData))) {
      let pEvent = {
        type: "fouls",
        amount: null,
        player: array[1],
        origEvent: eventData,
        extra: null
      }
      return pEvent;
    }
    //if player rebounds
    else if ((array = reboundMatch.exec(eventData))) {
      let pEvent = {
        type: "rebounds",
        amount: null,
        player: array[1],
        origEvent: eventData,
        extra: null
      }
      return pEvent;
    }
    // start of the game
    else if ((array = startGameMatch.exec(eventData))) {
      let pEvent = {
        type: "start game",
        amount: null,
        player: null,
        origEvent: eventData,
        extra: null
      }
      return pEvent;
    }
    // choose period
    else if ((array = periodMatch.exec(eventData))) {
      let pEvent = {
        type: "period",
        amount: parseInt(array[1]),
        player: null,
        origEvent: eventData,
        extra: null
      }
      return pEvent;
    }
    // next period
    else if ((array = nextPeriodMatch.exec(eventData))) {
      let pEvent = {
        type: "next period",
        amount: null,
        player: null,
        origEvent: eventData,
        extra: null
      }
      return pEvent;
    }
    // custom message
    else if ((array = customMessageMatch.exec(eventData))) {
      let pEvent = {
        type: "custom message",
        amount: null,
        player: null,
        origEvent: eventData,
        extra: array[1]
      }
      return pEvent;
    }
    else {
      return null;
    }
  }

  public getPlayer(id: string): Player {
    let team = (id.match("[hg]")[0] == "h" ? 0 : 1);
    let number = parseInt((id.match("([0-9]+)[hg]")[1]));
    return this.game.teams[team].players.find(p => p.number == number);
  }

  public receiveEvent(event: Event) {
    let parsedEvent = this.parseEvent(event);
    if (parsedEvent) {
      let team;
      if (parsedEvent.player) {
        team = (parsedEvent.player.match("[hg]")[0] == "h" ? 0 : 1);
        if (this.getPlayer(parsedEvent.player)) {
          if (!this.getPlayer(parsedEvent.player).stats) {
            this.getPlayer(parsedEvent.player).stats = { scores: [], fouls: 0, rebounds: 0 };
          }
        }
      }
      switch (parsedEvent.type) {
        case "scores":
          this.score[team] += parsedEvent.amount;
          this.score$.next(this.score);
          if (this.getPlayer(parsedEvent.player) != null) {
            this.getPlayer(parsedEvent.player).stats.scores.push(parsedEvent.amount);
          }
          break;
        case "free throw":
          this.score[team] += 1;
          this.score$.next(this.score);
          break;
        case "rebounds":
          if (this.getPlayer(parsedEvent.player) != null) {
            this.getPlayer(parsedEvent.player).stats.rebounds += parsedEvent.amount;
          }
          break;
        case "fouls":
          this.fouls[team] += 1;
          this.foul$.next(this.fouls);
          if (this.getPlayer(parsedEvent.player) != null) {
            this.getPlayer(parsedEvent.player).stats.fouls += parsedEvent.amount;
          }
          break;
        case "start game":
          this.period = 1;
          this.period$.next(this.period);
          break;
        case "period":
          this.period = parsedEvent.amount;
          this.period$.next(this.period);
          break;
        case "next period":
          if (this.period) {
            this.period += 1;
            this.period$.next(this.period);
          }
          break;
      };
    }
  }

  public selectGame(game: Game) {
    this.score = [0, 0];
    this.fouls = [0, 0];

    this.game = game;

    for (let e of game.events) {
      this.receiveEvent(e);
    }

    let homeID = game.teams[0].id;
    let guestID = game.teams[1].id;
    this.backendService.getTeam(homeID).subscribe({
      next: result => {
        this.game.teams[0] = result.body;
      }
    });
    this.backendService.getTeam(guestID).subscribe({
      next: result => {
        this.game.teams[1] = result.body;
      }
    });

    if (!this.gameSocket) {
      this.gameSocket = this.backendService.openWebSocket();
    }
    this.gameSocket.asObservable().subscribe(
      msg => {
        this.events$.next(msg as Event);
        this.receiveEvent(msg as Event);
      }
    );
    this.gameSocket.next(game.id);
  }

  public updateTeam() {
    this.backendService.getTeam(this.game.teams[0].id).subscribe({
      next: result => {
        this.game.teams[0] = result.body;
      }
    });
    this.backendService.getTeam(this.game.teams[1].id).subscribe({
      next: result => {
        this.game.teams[1] = result.body;
      }
    });
  }


  constructor(private backendService: BackendService) {
    this.score$ = new BehaviorSubject(this.score);
    this.foul$ = new BehaviorSubject(this.fouls);
    this.period$ = new BehaviorSubject(this.period);

    this.events$ = new Subject();
  }
}
