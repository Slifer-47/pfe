import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { BehaviorSubject,Observable,tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl="http://localhost:8080/auth"
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}
  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }
    private decodeAndSetUserData(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      this.currentUserSubject.next({
        fullName: decoded.fullName
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    if (token && !this.currentUserSubject.value) {
      this.decodeAndSetUserData(token);
    }
    return this.currentUserSubject.asObservable();
  }

  register(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,userData);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

interface AuthenticationResponse {
  token: string;
}