import { Component, inject } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";
import { AdminService } from "src/app/Services/admin.service";
import { Header } from "src/app/Utils/header/header";

@Component({
  selector: "app-admin-page",
  imports: [Header],
  template: `
    <app-header></app-header>
    <div class="admin-container">
      <div class="admin-card">
        <h1>Panneau d'administration</h1>
        <p>Gérez les produits et recettes proposés par les utilisateurs</p>
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

  private readonly adminService = inject(AdminService);

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    this.adminService.getpendingFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
        console.log("Foods en attente:", foods);
      },
      error: (err) => {
        console.error(
          "Erreur lors de la récupération des foods en attente:",
          err,
        );
      },
    });
  }
}
