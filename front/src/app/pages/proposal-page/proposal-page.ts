import { Component } from "@angular/core";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { FoodProposal } from "src/app/features/foods/components/food-proposal/food-proposal";
import { RecipeProposal } from "src/app/features/recipes/components/recipe-proposal/recipe-proposal";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: "app-proposal-page",
  imports: [Header, Footer, FoodProposal, RecipeProposal, MatTabsModule],
  template: `
    <div class="proposal-general">
      <app-header></app-header>
      <div class="proposal-container">
        <div class="proposal-header">
          <h1>Proposer un produit ou une recette</h1>
          <p>Partagez vos découvertes de saison avec la communauté 🌱</p>
        </div>
        <mat-tab-group class="proposal-tabs">
          <mat-tab label="Propositions d'ingrédients">
            <div class="tab-content">
              <app-food-proposal></app-food-proposal>
            </div>
          </mat-tab>
          <mat-tab label="Propositions de recettes">
            <div class="tab-content">
              <app-recipe-proposal></app-recipe-proposal>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: `
    .proposal-general {
      display: flex;
    }

    .proposal-container {
      max-width: 900px;
      margin: 0 auto;
      padding: var(--spacing-xl);
    }

    .proposal-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }

    .proposal-header h1 {
      color: var(--color-secondary);
      font-size: 28px;
      margin-bottom: var(--spacing-sm);
      font-weight: 600;
    }

    .proposal-header p {
      color: var(--color-text-light);
      font-size: 16px;
    }

    .proposal-tabs {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-lg);
    }

    .tab-content {
      padding: var(--spacing-lg) 0;
    }

    ::ng-deep .mat-mdc-tab-header {
      border-bottom: 2px solid var(--color-border-light);
    }

    ::ng-deep .mat-mdc-tab-label {
      color: var(--color-text-light);
      font-weight: 500;
    }

    ::ng-deep .mat-mdc-tab-label-active {
      color: var(--color-primary);
    }

    ::ng-deep
      .mat-mdc-tab-group
      .mat-mdc-tab-header
      .mat-mdc-tab-label-container
      .mat-mdc-tab-labels
      .mat-mdc-tab-label
      .mdc-tab__ripple::before {
      background-color: var(--color-primary);
    }
  `,
})
export class ProposalPage {}
