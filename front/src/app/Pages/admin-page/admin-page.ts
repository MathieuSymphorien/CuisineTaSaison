import { Component } from "@angular/core";
import { Header } from "src/app/Utils/header/header";

@Component({
  selector: "app-admin-page",
  imports: [Header],
  template: `
    <app-header></app-header>
    <p>admin-page works!</p>
  `,
  styles: ``,
})
export class AdminPage {}
