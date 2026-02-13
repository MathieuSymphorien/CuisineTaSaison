import { Component, inject, input, output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FoodModel } from "src/app/shared/models/food.model";
import { AdminService } from "src/app/features/auth/services/admin.service";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { FoodDetail } from "../food-detail/food-detail";
import { ArgumentOutOfRangeError } from "rxjs";

@Component({
  selector: "app-food",
  imports: [MatCardModule, MatIconModule, MatButtonModule],
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
    const colors = {
      FRUIT: "#7BC67B",
      LEGUME: "#4AA3DF",
      VIANDE: "#D9534F",
      POISSON: "#5BC0DE",
      CEREALE: "#C5A880",
      EPICE: "#F0AD4E",
      LACTE: "#F7E9D0",
      AUTRE: "#AAAAAA",
    };
    return category ? colors[category] : "#AAAAAA";
  }
}
