import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Team } from './model-objects/team';
import { Game } from './model-objects/game';
import { GameDto } from './model-objects/gameDto';
import { environment } from 'src/environments/environment';
import { Player } from './model-objects/player';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getHelloWorld(): Observable<HttpResponse<string>> {
    return this.http.get(`${baseUrl}/helloworld`, {
      withCredentials: false,
      observe: 'response',
      responseType: 'text',
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getAllTeams(): Observable<HttpResponse<Team[]>> {
    return this.http.get<Team[]>(`${baseUrl}/getAllTeams`, {
      withCredentials: false,
      observe: 'response'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getTeam(teamId: number): Observable<HttpResponse<Team>> {
    return this.http.get<Team>(`${baseUrl}/getTeam`, {
      withCredentials: false,
      observe: 'response',
      params: {
        teamID: teamId.toString()
      }
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createTeam(name: string): Observable<HttpResponse<string>> {
    return this.http.post(`${baseUrl}/createTeam`, { name: name, players: []}, {
      withCredentials: false,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Error: ", error.error.message);
    return throwError(error);
  }

  getGame(gameID: number): Observable<HttpResponse<Game>> {
    return this.http.get<Game>(`${baseUrl}/getGame`, {
      withCredentials: false,
      observe: 'response',
      params: {
        gameId: gameID.toString()
      }
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createGame(game: GameDto): Observable<HttpResponse<string>> {
    return this.http.post(`${baseUrl}/createGame`, game, {
      withCredentials: false,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getAllGames(): Observable<HttpResponse<Game[]>> {
    return this.http.get<Game[]>(`${baseUrl}/getAllGames`, {
      withCredentials: false,
      observe: 'response'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }
  
  updateRoster(roster: Player[], teamId: number): Observable<HttpResponse<string>> {
    return this.http.post(`${baseUrl}/updateRoster`, roster, {
      withCredentials: false,
      observe: 'response',
      responseType: 'text',
      params: {
        teamId: teamId.toString(),
      }
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createAndAddEvent(eventData: string, eventDate: number, gameId: number): Observable<HttpResponse<String>> {
    return this.http.post(`${baseUrl}/createAndAddEvent`, {}, {
      withCredentials: false,
      observe: 'response',
      responseType: 'text',
      params: {
        eventData: eventData,
        eventDate: eventDate.toString(),
        gameId: gameId.toString(),
      }
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }
  
}
