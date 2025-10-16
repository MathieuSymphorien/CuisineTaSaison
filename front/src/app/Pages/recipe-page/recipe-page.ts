import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";

@Component({
  selector: "app-recipe-page",
  imports: [Header],
  template: `
    <app-header></app-header>
    <p>Liste des recettes</p>
  `,
  styles: ``,
})
export class RecipePage {}
