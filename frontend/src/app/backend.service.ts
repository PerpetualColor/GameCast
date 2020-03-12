import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Team } from './model-objects/team';
import { Game } from './model-objects/game';
import { GameDto } from './model-objects/gameDto';
import { environment } from 'src/environments/environment';

// const this.baseUrl = 'ubuntu@ec2-18-144-88-105.us-west-1.compute.amazonaws.com:8080';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly baseUrl = 'ubuntu@ec2-18-144-88-105.us-west-1.compute.amazonaws.com:8080';

  constructor(private http: HttpClient) { }

  getHelloWorld(): Observable<HttpResponse<string>> {
    return this.http.get(`http://${this.baseUrl}/helloworld`, {
      withCredentials: false,
      observe: 'response',
      responseType: 'text',
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getAllTeams(): Observable<HttpResponse<Team[]>> {
    return this.http.get<Team[]>(`http://${this.baseUrl}/getAllTeams`, {
      withCredentials: false,
      observe: 'response'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getTeam(teamId: number): Observable<HttpResponse<Team>> {
    return this.http.get<Team>(`http://${this.baseUrl}/getTeam`, {
      withCredentials: false,
      observe: 'response',
      params: {
        teamID: teamId.toString()
      }
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createTeam(): Observable<HttpResponse<string>> {
    return this.http.post(`http://${this.baseUrl}/createTeam`, { name: "Dave", players: []}, {
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
    return this.http.get<Game>(`http://${this.baseUrl}/getGame`, {
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
    return this.http.post(`http://${this.baseUrl}/createGame`, game, {
      withCredentials: false,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getAllGames(): Observable<HttpResponse<Game[]>> {
    return this.http.get<Game[]>(`http://${this.baseUrl}/getAllGames`, {
      withCredentials: false,
      observe: 'response'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createAndAddEvent(eventData: string, eventDate: number, gameId: number): Observable<HttpResponse<String>> {
    return this.http.post(`http://${this.baseUrl}/createAndAddEvent`, {}, {
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
