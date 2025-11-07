import { input } from "@angular/core";
import { Component, output } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";

@Component({
  selector: "app-recipe-proposal",
  imports: [],
  template: `
    <h2>Nom de la recette</h2>
    <input type="text" />
    <h2>Description</h2>
    <textarea></textarea>
    <h2>Temps de préparation (minutes)</h2>
    <input type="number" />
    <h2>Utilisation du four</h2>
    <input type="checkbox" />
    <h2>Nombre de personnes</h2>
    <input type="number" />
    <h2>Étapes de la recette</h2>
    <textarea></textarea>
    <h2>Ingrédients</h2>
    <input type="text" />
    <h2>Ratio de saisonnalité (optionnel)</h2>
    <input type="number" step="1" />
    <button (click)="submitProposal()">Proposer</button>
  `,
  styles: ``,
})
export class RecipeProposal {
  name = output<string>();
  description = output<string>();
  time = output<number>();
  oven = output<boolean>();
  people = output<number>();
  steps = output<string[]>();
  foods = output<FoodModel[]>();
  seasonRatio = output<number>();
  submitProposal() {
    // Logique pour soumettre la proposition de recette
  }
}
