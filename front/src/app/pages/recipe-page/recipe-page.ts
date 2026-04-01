import { Component, inject, OnInit, signal } from "@angular/core";
import { SeoService } from "src/app/core/services/seo.service";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
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
  imports: [Header, Footer, RecipeList, FilterRecipe],
  template: `
    <div class="recipe-general">
      <div class="recipe-content">
        <app-header></app-header>

        <div class="recipe-page">
          <button
            class="filters-toggle"
            (click)="isFiltersOpen.set(!isFiltersOpen())"
          >
            <span class="burger-label">Filtres</span>
          </button>
          <div class="filters-container" [class.open]="isFiltersOpen()">
            <app-filter-recipe (filtersChange)="applyFilters($event)">
            </app-filter-recipe>
          </div>
          <div class="recipes-container">
            <app-recipe-list [recipes]="recipes"></app-recipe-list>
          </div>
        </div>
      </div>
      <div>
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [
    `
      .recipe-general {
        background: var(--hero-gradient-head);
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .recipe-content {
        flex-grow: 1;
      }
      .recipe-page {
        display: flex;
        padding: var(--spacing-xl);
        gap: var(--spacing-xl);
        max-width: 1400px;
        margin: 0 auto;
        min-height: calc(100vh - 200px);
        width: 100%;
        box-sizing: border-box;
      }
      .filters-container {
        flex: 0 0 300px;
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
      .filters-toggle {
        display: none;
      }

      @media (max-width: 968px) {
        .recipe-page {
          flex-direction: column;
          padding: var(--spacing-md);
          gap: var(--spacing-md);
        }
        .filters-container {
          position: static;
          flex: none;
          width: 100%;
          box-sizing: border-box;
        }
      }

      @media (max-width: 480px) {
        .recipe-page {
          padding: var(--spacing-sm);
          padding-top: calc(48px + var(--spacing-lg) + var(--spacing-md));
          gap: var(--spacing-sm);
        }
        .filters-toggle {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm) var(--spacing-md);
          cursor: pointer;
          width: 100%;
          box-sizing: border-box;
          box-shadow: var(--shadow-sm);
        }
        .burger-bar {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--color-secondary);
          border-radius: 2px;
          flex-shrink: 0;
        }
        .burger-label {
          color: var(--color-secondary);
          font-weight: 600;
          font-size: 0.95rem;
        }
        .filters-container {
          display: none;
        }
        .filters-container.open {
          display: block;
        }
      }
    `,
  ],
})
export class RecipePage implements OnInit {
  private readonly recipeApiService = inject(RecipeApiService);
  private readonly seoService = inject(SeoService);

  recipes: RecipeModel[] = [];
  isFiltersOpen = signal(false);

  ngOnInit(): void {
    this.seoService.update({
      title: "Recettes de saison",
      description: "Découvrez des recettes cuisinées avec des ingrédients de saison. Filtrez par temps de préparation, aliments et mois.",
      url: "/recette",
    });
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
