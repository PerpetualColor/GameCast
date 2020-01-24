import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Team } from './model-objects/team';

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
    return this.http.get<Team[]>(`${baseUrl}/getTeams`, {
      withCredentials: false,
      observe: 'response'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Error: ", error.error.message);
    return throwError(error);
  }

  
}
