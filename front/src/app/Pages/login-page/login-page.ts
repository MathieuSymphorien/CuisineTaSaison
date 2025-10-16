import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";

@Component({
  selector: "app-login-page",
  imports: [Header],
  template: `
    <app-header></app-header>
    <p>login-page works!</p>
  `,
  styles: ``,
})
export class LoginPage {}
