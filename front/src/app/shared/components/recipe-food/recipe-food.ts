import {
  Component,
  effect,
  input,
  output,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { FoodModel } from "src/app/shared/models/food.model";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { FoodApiService } from "src/app/features/foods/services/food-api.service";
import { DataApiService } from "src/app/shared/models/data.service";

import {
  RecipeFoodRequest,
  RecipeFoodResponse,
} from "src/app/shared/models/recipe.model";
import { Units } from "src/app/shared/models/units.model";

@Component({
  selector: "app-recipe-food",
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: "./recipe-food.html",
  styleUrls: ["./recipe-food.css"],
})
export class RecipeFoodControl {
  private readonly foodApiService = inject(FoodApiService);
  private readonly dataApiService = inject(DataApiService);

  displayedColumns: string[] = ["foodId", "quantity", "unit", "action"];
  recipeFoodResponses = input<RecipeFoodResponse[]>([]);
  internalValue = signal<RecipeFoodResponse[]>([]);
  recipeFoodRequests = output<RecipeFoodRequest[]>();
  // availableFoodNames = input<string[]>([]);
  // availableUnits = input<Units[]>([]);
  availableQuantities = input<number[]>([]);

  availableFoods = signal<FoodModel[]>([]);
  availableFoodNames = signal<string[]>([]);
  availableUnits = signal<Units[]>([]);

  constructor() {
    effect(() => {
      this.internalValue.set(this.recipeFoodResponses());
    });

    this.loadAvailableFoods();
    this.loadUnits();
  }

  private loadAvailableFoods() {
    this.foodApiService.getAllFoods().subscribe({
      next: (foods) => {
        this.availableFoods.set(foods);
        this.availableFoodNames.set(foods.map((f) => f.name));
      },
      error: (err) => console.error("Erreur chargement aliments:", err),
    });
  }

  private loadUnits() {
    this.dataApiService.getUnits().subscribe({
      next: (units) => this.availableUnits.set(units.map((u) => u)),
      error: (err) => console.error("Erreur chargement unités:", err),
    });
  }

  private foodNameToId(foodName: string): number {
    const food = this.availableFoods().find((f) => f.name === foodName);
    return food ? food.id : -1;
  }

  private foodsRowToRecipeFoods(): RecipeFoodRequest[] {
    return this.internalValue().map((row) => ({
      foodId: this.foodNameToId(row.foodName),
      quantity: row.quantity,
      unit: row.unit,
    }));
  }

  addRecipeFood() {
    this.internalValue.update((current) => [
      ...current,
      { foodId: 0, foodName: "", quantity: 0, unit: "" },
    ]);
    this.recipeFoodRequests.emit(this.foodsRowToRecipeFoods());
  }

  removeRecipeFood(recipeFood: RecipeFoodResponse) {
    this.internalValue.update((current) =>
      current.filter((rf) => rf !== recipeFood),
    );
    this.recipeFoodRequests.emit(this.foodsRowToRecipeFoods());
  }

  onValueChange() {
    this.recipeFoodRequests.emit(this.foodsRowToRecipeFoods());
  }
}
