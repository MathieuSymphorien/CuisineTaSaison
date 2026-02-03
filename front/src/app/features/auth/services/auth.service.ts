import { Injectable, computed, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

interface TokenPayload {
  role: string;
  exp: number;
  sub: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly apiUrl = "/api/auth/login";
  private readonly tokenKey = "admin_token";

  // Signal privé pour le token
  private readonly tokenSignal = signal<string | null>(this.getStoredToken());

  // Signal public computed pour isAdmin - à utiliser dans les composants
  readonly isAdmin = computed(() => {
    const token = this.tokenSignal();
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      return payload?.role === "ADMIN";
    } catch {
      return false;
    }
  });

  // Signal public computed pour isLoggedIn
  readonly isLoggedIn = computed(() => !!this.tokenSignal());

  constructor(private http: HttpClient) {}

  login(password: string): Observable<string> {
    return this.http
      .post(this.apiUrl, { password }, { responseType: "text" })
      .pipe(
        tap((token: string) => {
          localStorage.setItem(this.tokenKey, token);
          this.tokenSignal.set(token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSignal.set(null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private decodeToken(token: string): TokenPayload | null {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }
}
