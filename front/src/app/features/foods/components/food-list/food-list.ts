import { Component, input, output } from "@angular/core";
import { Food } from "../food/food";
import { FoodModel } from "src/app/shared/models/food.model";

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
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: var(--spacing-lg);
      padding: var(--spacing-md);
    }

    @media (max-width: 480px) {
      .food-list {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
      }
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
