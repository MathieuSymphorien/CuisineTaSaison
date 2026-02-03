import { Component, inject, input, output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FoodModel } from "src/app/Models/food.model";
import { AdminService } from "src/app/Services/admin.service";
import { AuthService } from "src/app/Services/auth.service";
import { FoodDetail } from "../food-detail/food-detail";

@Component({
  selector: "app-food",
  standalone: true,
  templateUrl: "./food.html",
  styleUrls: ["./food.css"],
})
export class Food {
  private readonly adminService = inject(AdminService);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  food = input<FoodModel>();
  foodChanged = output<number>();

  readonly isAdmin = this.authService.isAdmin;

  openDetail() {
    const food = this.food();
    if (!food) return;

    const dialogRef = this.dialog.open(FoodDetail, {
      data: { food },
      panelClass: "transparent-dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.foodChanged.emit(result.id);
      }
    });
  }

  rejectFood(food: FoodModel | undefined): void {
    if (!food?.id) return;
    this.adminService.rejectFood(food.id).subscribe({
      next: () => this.foodChanged.emit(food.id),
    });
  }

  approveFood(food: FoodModel | undefined): void {
    if (!food?.id) return;
    this.adminService.approveFood(food.id).subscribe({
      next: () => this.foodChanged.emit(food.id),
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
}
