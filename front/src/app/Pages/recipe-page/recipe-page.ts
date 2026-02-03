import { Component, inject, OnInit } from "@angular/core";
import { Header } from "../../shared/components/header/header";
import { RecipeModel } from "src/app/shared/models/recipe.model";
import { RecipeList } from "src/app/features/recipes/components/recipe-list/recipe-list";
import {
  FilterRecipe,
  RecipeFilterValues,
} from "src/app/features/recipes/components/filter-recipe/filter-recipe";
import { RecipeApiService } from "src/app/features/recipes/services/recipe-api.service";

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
export class RecipePage implements OnInit {
  private readonly recipeApiService = inject(RecipeApiService);

  recipes: RecipeModel[] = [];

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(filters?: RecipeFilterValues): void {
    this.recipeApiService
      .getAllRecipes({
        name: filters?.name || undefined,
        timeMin: filters?.time?.min || undefined,
        timeMax: filters?.time?.max || undefined,
        oven: filters?.oven || undefined,
        months: filters?.months?.length ? filters.months : undefined,
        includeFoodIds: filters?.includeFoodIds?.length
          ? filters.includeFoodIds
          : undefined,
        excludeFoodIds: filters?.excludeFoodIds?.length
          ? filters.excludeFoodIds
          : undefined,
      })
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        },
      });
  }

  applyFilters(filters: RecipeFilterValues): void {
    this.loadRecipes(filters);
  }
}
