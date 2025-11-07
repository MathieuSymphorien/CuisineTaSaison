import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { FoodProposal } from "src/app/Core/food-proposal/food-proposal";
import { RecipeProposal } from "src/app/Core/recipe-proposal/recipe-proposal";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: "app-proposal-page",
  imports: [Header, FoodProposal, RecipeProposal, MatTabsModule],
  template: `
    <app-header></app-header>
    <mat-tab-group>
      <mat-tab label="Propositions d'ingrédients">
        <app-food-proposal></app-food-proposal>
      </mat-tab>
      <mat-tab label="Propositions de recettes">
        <app-recipe-proposal></app-recipe-proposal>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: ``,
})
export class ProposalPage {}
