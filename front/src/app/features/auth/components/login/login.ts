import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/features/auth/services/auth.service";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  templateUrl: "./login.html",
  styleUrls: ["./login.css"],
})
export class Login {
  password: string = "";
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService.login(this.password).subscribe({
      next: () => this.router.navigate(["/admin"]),
      error: () => (this.error = "Mot de passe incorrect 🍋"),
    });
  }
}
