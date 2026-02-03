import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      this.router.navigate([""]);
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "ADMIN") return true;
    } catch {}

    this.router.navigate([""]);
    return false;
  }
}
