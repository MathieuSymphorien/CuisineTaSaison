import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { MockDataService } from "src/app/Services/mock-data";
import { RecipeModel } from "src/app/Models/recipe.model";
import { RecipeList } from "src/app/Core/recipe-list/recipe-list";
import { FilterRecipe } from "src/app/Core/filter-recipe/filter-recipe";

@Component({
  selector: "app-recipe-page",
  standalone: true,
  imports: [Header, RecipeList, FilterRecipe],
  template: `
    <app-header></app-header>

    <div class="recipe-page">
      <div class="filters-container">
        <app-filter-recipe (filtersChange)="applyFilters($event)">
        </app-filter-recipe>
      </div>
      <div class="recipes-container">
        <app-recipe-list [recipes]="recipes"></app-recipe-list>
      </div>
    </div>
  `,
  styles: [
    `
      .recipe-page {
        display: flex;
        padding: 2rem;
        gap: 2rem;
        max-width: 1400px;
        margin: 0 auto;
        min-height: calc(100vh - 200px);
      }
      .filters-container {
        flex: 0 0 320px;
        background-color: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        padding: var(--spacing-lg);
        height: fit-content;
        position: sticky;
        top: var(--spacing-lg);
      }

      .recipes-container {
        flex: 1;
        min-width: 0;
      }

      @media (max-width: 968px) {
        .recipe-page {
          flex-direction: column;
        }
        
        .filters-container {
          position: static;
          flex: 1;
        }
      }
    `,
  ],
})
export class RecipePage {
  recipes: RecipeModel[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.recipes = this.mockData.getRecipes();
  }

  applyFilters(filters: any) {
    console.log("Filtres reçus :", filters);
    // ➜ Tu pourras ici appliquer ton vrai filtrage de recettes
  }
}
