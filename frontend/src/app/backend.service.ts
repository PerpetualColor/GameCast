import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    });
  }
  
}
