import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly apiUrl = "/api/auth/login";
  private readonly tokenKey = "admin_token";

  constructor(private http: HttpClient) {}

  login(password: string): Observable<string> {
    return this.http
      .post(this.apiUrl, { password }, { responseType: "text" })
      .pipe(
        tap((token: string) => {
          localStorage.setItem(this.tokenKey, token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role === "ADMIN";
    } catch {
      return false;
    }
  }
}
