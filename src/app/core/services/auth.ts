import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const ACCESS_TOKEN_KEY = 'sp_access_token';
const EXPIRES_AT_KEY = 'sp_expires_at';
const CODE_VERIFIER_KEY = 'sp_code_verifier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accessToken: string | null = null;
  private _expiresAt: number | null = null;
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  private loadToken(): void {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const expires = localStorage.getItem(EXPIRES_AT_KEY);

    if (token && expires && new Date().getTime() < parseInt(expires, 10)) {
      this._accessToken = token;
      this._expiresAt = parseInt(expires, 10);
      this._isLoggedIn.next(true);
    } else {
      this.logout();
    }
  }

  getAccessToken(): string | null {
    if (!this._accessToken || (this._expiresAt && new Date().getTime() > this._expiresAt)) {
      this.logout();
      return null;
    }
    return this._accessToken;
  }

  private generateCodeVerifier(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  async login(): Promise<void> {
    const codeVerifier = this.generateCodeVerifier(128);
    localStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    const params = new HttpParams({
      fromObject: {
        response_type: 'code',
        client_id: environment.clientId,
        scope: 'user-read-email',
        redirect_uri: environment.redirectUri,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      }
    });

    window.location.href = `${environment.spotifyAccountsBase}/authorize?${params.toString()}`;
  }

  handleRedirectCallback(code: string): Observable<boolean> {
    const codeVerifier = localStorage.getItem(CODE_VERIFIER_KEY);

    if (!codeVerifier) {
      this.router.navigate(['/']);
      return of(false);
    }

    localStorage.removeItem(CODE_VERIFIER_KEY);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams({
      fromObject: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: environment.redirectUri,
        client_id: environment.clientId,
        code_verifier: codeVerifier,
      }
    });

      return this.http.post<{ access_token: string; expires_in: number }>(
      `${environment.spotifyAccountsBase}/api/token`,
      body.toString(),
      { headers }
    ).pipe(
      tap(response => {
        const expiresInMs = response.expires_in * 1000;
        const expiresAt = new Date().getTime() + expiresInMs;
        localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
        localStorage.setItem(EXPIRES_AT_KEY, expiresAt.toString());
        this._accessToken = response.access_token;
        this._expiresAt = expiresAt;
        this._isLoggedIn.next(true);
      }),
      map(() => true)
    );
  }

  logout(): void {
    this._accessToken = null;
    this._expiresAt = null;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
    localStorage.removeItem(CODE_VERIFIER_KEY);
    this._isLoggedIn.next(false);
    this.router.navigate(['/']);
  }
}