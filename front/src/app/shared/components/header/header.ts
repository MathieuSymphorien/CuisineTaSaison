import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "src/app/features/auth/services/auth.service";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterOutlet],
  templateUrl: "./header.html",
  styleUrls: ["./header.css"],
})
export class Header {
  private readonly authService = inject(AuthService);

  readonly isAdmin = this.authService.isAdmin;
}
