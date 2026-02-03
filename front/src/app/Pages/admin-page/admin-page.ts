import { Component, inject, OnInit } from "@angular/core";
import { FoodModel } from "src/app/shared/models/food.model";
import { AdminService } from "src/app/features/auth/services/admin.service";
import { Header } from "src/app/shared/components/header/header";
import { FoodList } from "src/app/features/foods/components/food-list/food-list";
import { RecipeList } from "src/app/features/recipes/components/recipe-list/recipe-list";
import { RecipeModel } from "src/app/shared/models/recipe.model";

@Component({
  selector: "app-admin-page",
  imports: [Header, FoodList, RecipeList],
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
          (recipesChanged)="onRecipeChanged($event)"
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
export class AdminPage implements OnInit {
  foods: FoodModel[] = [];
  recipes: RecipeModel[] = [];

  private readonly adminService = inject(AdminService);

  ngOnInit(): void {
    this.loadFoods();
    this.loadRecipes();
  }

  loadFoods(): void {
    this.adminService.getPendingFoods().subscribe({
      next: (foods: FoodModel[]) => {
        this.foods = foods;
      },
    });
  }

  loadRecipes(): void {
    this.adminService.getPendingRecipes().subscribe({
      next: (recipes: RecipeModel[]) => {
        this.recipes = recipes;
      },
    });
  }

  onFoodChanged(foodId: number): void {
    this.foods = this.foods.filter((food) => food.id !== foodId);
  }

  onRecipeChanged(recipeId: number): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
  }
}
