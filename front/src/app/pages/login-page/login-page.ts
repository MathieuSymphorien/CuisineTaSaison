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
    </div>
    <app-footer></app-footer>
  `,
  styles: `
    .login-general {
      display: flex;
    }

    .login-container {
      flex-grow: 1;
    }
  `,
})
export class LoginPage {}
