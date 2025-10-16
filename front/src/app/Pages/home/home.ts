import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";
@Component({
  selector: "app-home",
  imports: [Header],
  template: `
    <app-header></app-header>
    <h1>Bienvenue sur CuisineTaSaison !</h1>
  `,
  styleUrls: ["./home.css"],
})
export class Home {}
