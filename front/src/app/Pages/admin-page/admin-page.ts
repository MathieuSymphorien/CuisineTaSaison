import { Component, inject } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";
import { AdminService } from "src/app/Services/admin.service";
import { Header } from "src/app/Utils/header/header";
import { FoodList } from "src/app/Core/food-list/food-list";

@Component({
  selector: "app-admin-page",
  imports: [Header, FoodList],
  template: `
    <app-header></app-header>
    <div class="admin-container">
      <div class="admin-card">
        <h1>Panneau d'administration</h1>
      </div>
      <app-food-list
        [foods]="foods"
        (foodChanged)="onFoodChanged($event)"
      ></app-food-list>
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

  private readonly adminService = inject(AdminService);

  ngOnInit(): void {
    this.loadFoods();
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

  onFoodChanged(foodId: number) {
    // Retire le food de la liste locale
    this.foods = this.foods.filter((food) => food.id !== foodId);
  }
}
