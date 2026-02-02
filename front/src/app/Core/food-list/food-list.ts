import { Component, input, output } from "@angular/core";
import { Food } from "../food/food";
import { FoodModel } from "src/app/Models/food.model";

@Component({
  selector: "app-food-list",
  standalone: true,
  imports: [Food],
  template: `
    <div class="food-list">
      @for (food of foods(); track food.id) {
        <app-food
          [food]="food"
          (foodChanged)="onFoodChanged($event)"
        ></app-food>
      }
    </div>
  `,
  styles: `
    .food-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--spacing-lg);
      align-items: flex-start;
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-md);
    }
  `,
})
export class FoodList {
  foods = input<FoodModel[]>();
  foodChanged = output<number>();

  onFoodChanged(foodId: number) {
    this.foodChanged.emit(foodId);
  }
}
