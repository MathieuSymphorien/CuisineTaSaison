import { Component } from "@angular/core";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { Login } from "src/app/features/auth/components/login/login";

@Component({
  selector: "app-login-page",
  imports: [Header, Footer, Login],
  template: ` <app-header></app-header> <app-login></app-login> <app-footer></app-footer> `,
  styles: ``,
})
export class LoginPage {}
