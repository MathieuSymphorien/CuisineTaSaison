import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { Login } from "src/app/Utils/login/login";

@Component({
  selector: "app-login-page",
  imports: [Header, Login],
  template: ` <app-header></app-header> <app-login></app-login> `,
  styles: ``,
})
export class LoginPage {}
