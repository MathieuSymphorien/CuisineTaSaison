import { Component } from "@angular/core";
import { Header } from "../header/header";

@Component({
  selector: "app-recipe-page",
  imports: [Header],
  template: `
    <app-header></app-header>
    <p>recipe-page works!</p>
  `,
  styles: ``,
})
export class RecipePage {}
