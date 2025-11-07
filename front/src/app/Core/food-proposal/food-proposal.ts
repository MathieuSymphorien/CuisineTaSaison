import { Month } from "./../../Models/month.model";
import { Component, output } from "@angular/core";
import { FoodCategory } from "src/app/Models/food.model";

@Component({
  selector: "app-food-proposal",
  imports: [],
  template: `
    <div>
      <h2>Nom de l'ingrédient</h2>
      <input type="text" (input)="name.emit($event.target.value)" />
      <h2>Catégorie</h2>
      <select>
        <option value="fruit">Fruit</option>
        <option value="vegetable">Légume</option>
        <option value="dairy">Produits laitiers</option>
      </select>
      <h2>Mois de disponibilité</h2>
      <select multiple>
        <option value="january">Janvier</option>
        <option value="february">Février</option>
        <option value="march">Mars</option>
        <option value="april">Avril</option>
        <option value="may">Mai</option>
        <option value="june">Juin</option>
        <option value="july">Juillet</option>
        <option value="august">Août</option>
        <option value="september">Septembre</option>
        <option value="october">Octobre</option>
        <option value="november">Novembre</option>
        <option value="december">Décembre</option>
      </select>
      <button (click)="submitProposal()">Proposer</button>
    </div>
  `,
  styles: ``,
})
export class FoodProposal {
  name = output<string>();
  category = output<FoodCategory>();
  months = output<Month[]>();

  submitProposal() {
    // Logique pour soumettre la proposition d'ingrédient
  }
}
