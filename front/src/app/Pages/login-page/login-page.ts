import { Component } from "@angular/core";
import { Header } from "../../shared/components/header/header";
import { Login } from "src/app/features/auth/components/login/login";

@Component({
  selector: "app-login-page",
  imports: [Header, Login],
  template: ` <app-header></app-header> <app-login></app-login> `,
  styles: ``,
})
export class LoginPage {}
