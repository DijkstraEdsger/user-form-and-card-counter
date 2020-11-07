import { Injectable } from '@angular/core';
import { User } from '../../classes/user';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl + 'admin/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(this.apiUrl, { headers: headers });
  }

  createUser(newUserData: User): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    return this.http.post<any>(this.apiUrl, newUserData, { headers: headers });
  }

  getUser(id: string) {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }
}
