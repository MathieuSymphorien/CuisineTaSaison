import { Component, inject } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";
import { AdminService } from "src/app/Services/admin.service";
import { Header } from "src/app/Utils/header/header";
import { FoodList } from "src/app/Core/food-list/food-list";
import { Recipe } from "src/app/Core/recipe/recipe";
import { RecipeList } from "src/app/Core/recipe-list/recipe-list";
import { RecipeModel } from "src/app/Models/recipe.model";

@Component({
  selector: "app-admin-page",
  imports: [Header, FoodList, Recipe, RecipeList],
  template: `
    <app-header></app-header>
    <div class="admin-container">
      <div class="admin-card">
        <h1>Panneau d'administration</h1>
      </div>
      <div>
        <h1>Aliments</h1>
        <app-food-list
          [foods]="foods"
          (foodChanged)="onFoodChanged($event)"
        ></app-food-list>
      </div>
      <div>
        <h1>Recettes</h1>
        <app-recipe-list
          [recipes]="recipes"
          (recipesChanged)="onRecipesChanged($event)"
        ></app-recipe-list>
      </div>
    </div>
  `,
  styles: `
    .admin-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-xl);
    }

    .admin-card {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-2xl);
      text-align: center;
    }

    .admin-card h1 {
      color: var(--color-secondary);
      font-size: 28px;
      margin-bottom: var(--spacing-md);
      font-weight: 600;
    }

    .admin-card p {
      color: var(--color-text-light);
      font-size: 16px;
    }
  `,
})
export class AdminPage {
  foods: FoodModel[] = [];
  recipes: RecipeModel[] = [];

  private readonly adminService = inject(AdminService);

  ngOnInit(): void {
    this.loadFoods();
    this.loadRecipes();
  }

  loadFoods(): void {
    this.adminService.getpendingFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => {
        console.error(
          "Erreur lors de la récupération des foods en attente:",
          err,
        );
      },
    });
  }

  loadRecipes(): void {
    this.adminService.getPendingRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.error(
          "Erreur lors de la récupération des recettes en attente:",
          err,
        );
      },
    });
  }

  onFoodChanged(foodId: number) {
    // Retire le food de la liste locale
    this.foods = this.foods.filter((food) => food.id !== foodId);
  }

  onRecipesChanged(recipeId: number) {
    // Retire la recette de la liste locale
    this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
  }
}
