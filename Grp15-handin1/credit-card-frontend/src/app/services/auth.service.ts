import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginDto {
  username: string;
  password: string;
}

export interface CreateGroupDto {
  prefix: string;
  groupNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://assignment1.swafe.dk/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if already authenticated
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  createGroup(groupData: CreateGroupDto): Observable<any> {
    return this.http.post(`${this.API_URL}/Group`, groupData);
  }

  login(credentials: LoginDto): Observable<string> {
    // API returns a plain text JWT token (content-type: text/plain)
    return this.http.post(`${this.API_URL}/Login`, credentials, { responseType: 'text' }).pipe(
      tap((token: string) => {
        localStorage.setItem('auth_token', token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
