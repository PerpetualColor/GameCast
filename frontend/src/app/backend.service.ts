import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Team } from './model-objects/team';
import { Game } from './model-objects/game';
import { GameDto } from './model-objects/gameDto';
import { environment } from 'src/environments/environment';
import { Player } from './model-objects/player';
import { webSocket } from 'rxjs/webSocket';
import { User } from './model-objects/user';

const baseUrl = (environment.production ? 'https://www.advtopics.xyz:8443' : 'http://localhost:8080');

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
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      catchError(error => this.handleError(error))
    );
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
      withCredentials: true,
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
      withCredentials: true,
      observe: 'response',
      responseType: 'text',
      params: {
        teamId: teamId.toString(),
      }
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createAndAddEvent(eventData: string, eventDate: number, gameId: number): Observable<HttpResponse<string>> {
    return this.http.post(`${baseUrl}/createAndAddEvent`, {}, {
      withCredentials: true,
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

  requestLogin(username: string, password: string): Observable<HttpResponse<string>> {
    const formData: FormData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return this.http.post(`${baseUrl}/login`, formData, {
      responseType: 'text',
      withCredentials: true,
      observe: 'response'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  registerUser(user: User): Observable<HttpResponse<string>> {
    return this.http.post(`${baseUrl}/register`, user, {
      responseType: 'text',
      withCredentials: true,
      observe: 'response'
    }).pipe(
      catchError(error => this.handleError(error))
    )
  }

  getLoggedIn(): Observable<HttpResponse<string>> {
    return this.http.get(`${baseUrl}/getLoggedIn`, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    });
  }

  addAuthorizedUser(username: string, gameId: number): Observable<HttpResponse<string>> {
    return this.http.post(`${baseUrl}/addAuthorizedUser`, {}, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text',
      params: {
        gameId: gameId.toString(),
        username: username
      }
    }).pipe(
      catchError(error => this.handleError(error))
    )
  }

  logout(): Observable<HttpResponse<string>> {
    return this.http.post(`${baseUrl}/logout`, {}, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      catchError(error => this.handleError(error))
    )
  }

  openWebSocket() {
    return webSocket({
      url: `ws${baseUrl.split("http")[1]}/webSocket`
    });
  }

  
  private handleError(error: HttpErrorResponse) {
    console.error("Error: ", error.error.message);
    return throwError(error);
  }
  
}
