import { Component, inject, input, output } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";
import { AdminService } from "src/app/Services/admin.service";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-food",
  standalone: true,
  templateUrl: "./food.html",
  styleUrls: ["./food.css"],
})
export class Food {
  private readonly adminService = inject(AdminService);
  private readonly authService = inject(AuthService);

  food = input<FoodModel>();
  foodChanged = output<number>();

  deleteFood(food: FoodModel | undefined) {
    if (!food?.id) return;
    console.log("Refuser l'aliment avec ID:", food.id);
    this.adminService.rejectFood(food.id).subscribe({
      next: () => {
        this.foodChanged.emit(food.id);
      },
      error: (err) => {
        console.error("Erreur lors de la suppression de l'aliment:", err);
      },
    });
  }

  acceptFood(food: FoodModel | undefined) {
    if (!food?.id) return;

    this.adminService.approveFood(food.id).subscribe({
      next: () => {
        this.foodChanged.emit(food.id);
      },
      error: (err) => {
        console.error("Erreur lors de l'approbation de l'aliment:", err);
      },
    });
  }

  getBackgroundColor(category: FoodModel["category"] | undefined): string {
    switch (category) {
      case "FRUIT":
        return "#7BC67B";
      case "LEGUME":
        return "#4AA3DF";
      case "VIANDE":
        return "#D9534F";
      case "POISSON":
        return "#5BC0DE";
      case "CEREALE":
        return "#C5A880";
      case "EPICE":
        return "#F0AD4E";
      case "LACTE":
        return "#F7E9D0";
      default:
        return "#AAAAAA";
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
