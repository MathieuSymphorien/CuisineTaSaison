import { Component } from "@angular/core";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { Login } from "src/app/features/auth/components/login/login";

@Component({
  selector: "app-login-page",
  imports: [Header, Footer, Login],
  template: `
    <div class="login-general">
      <div>
        <app-header></app-header>
      </div>
      <div class="login-container">
        <app-login></app-login>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: `
    .login-general {
      background: var(--hero-gradient-head);
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .login-container {
      flex-grow: 1;
    }
  `,
})
export class LoginPage {}
