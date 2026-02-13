import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "src/app/features/auth/services/auth.service";

@Component({
  selector: "app-header",
  imports: [
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: "./header.html",
  styleUrls: ["./header.css"],
})
export class Header {
  private readonly authService = inject(AuthService);
  readonly isAdmin = this.authService.isAdmin;

  sidenavOpened = true;

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
