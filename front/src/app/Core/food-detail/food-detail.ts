import { Component, inject, signal, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { FoodModel, FoodCategory } from "src/app/Models/food.model";
import { Month, MONTHS } from "src/app/Models/month.model";
import { AuthService } from "src/app/Services/auth.service";
import { FoodApiService } from "src/app/Services/food-api.service";
import { NotificationService } from "src/app/Services/notification.service";

@Component({
  selector: "app-food-detail",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./food-detail.html",
  styleUrls: ["./food-detail.css"],
})
export class FoodDetail implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<FoodDetail>);
  private readonly data = inject<{ food: FoodModel }>(MAT_DIALOG_DATA);
  private readonly authService = inject(AuthService);
  private readonly foodApiService = inject(FoodApiService);
  private readonly notificationService = inject(NotificationService);

  readonly isAdmin = this.authService.isAdmin;
  isEditing = signal(false);
  isSaving = signal(false);

  food = signal<FoodModel | null>(null);
  name = signal("");
  category = signal<FoodCategory>("AUTRE");
  selectedMonths = signal<Set<Month>>(new Set());

  readonly foodCategories: FoodCategory[] = [
    "FRUIT",
    "LEGUME",
    "VIANDE",
    "POISSON",
    "CEREALE",
    "EPICE",
    "LACTE",
    "AUTRE",
  ];

  readonly allMonths = MONTHS;

  ngOnInit() {
    const f = this.data.food;
    this.food.set(f);
    this.name.set(f.name);
    this.category.set(f.category);
    this.selectedMonths.set(new Set(f.months));
  }

  close() {
    this.dialogRef.close();
  }

  toggleEdit() {
    if (this.isEditing()) {
      this.resetForm();
    }
    this.isEditing.set(!this.isEditing());
  }

  private resetForm() {
    const f = this.data.food;
    this.name.set(f.name);
    this.category.set(f.category);
    this.selectedMonths.set(new Set(f.months));
  }

  toggleMonth(month: Month) {
    const set = new Set(this.selectedMonths());
    if (set.has(month)) {
      set.delete(month);
    } else {
      set.add(month);
    }
    this.selectedMonths.set(set);
  }

  isMonthSelected(month: Month): boolean {
    return this.selectedMonths().has(month);
  }

  save() {
    this.isSaving.set(true);

    const updatedFood = {
      name: this.name(),
      category: this.category(),
      months: Array.from(this.selectedMonths()),
    };

    this.foodApiService.update(this.data.food.id, updatedFood).subscribe({
      next: (food) => {
        this.notificationService.success("Aliment mis à jour avec succès");
        this.isSaving.set(false);
        this.isEditing.set(false);
        this.dialogRef.close(food);
      },
      error: () => {
        this.notificationService.error("Erreur lors de la mise à jour");
        this.isSaving.set(false);
      },
    });
  }

  getBackgroundColor(category: FoodCategory): string {
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

  getCategoryLabel(category: FoodCategory): string {
    const labels: Record<FoodCategory, string> = {
      FRUIT: "Fruit",
      LEGUME: "Légume",
      VIANDE: "Viande",
      POISSON: "Poisson",
      CEREALE: "Céréale",
      EPICE: "Épice",
      LACTE: "Produit laitier",
      AUTRE: "Autre",
    };
    return labels[category] || category;
  }
}
