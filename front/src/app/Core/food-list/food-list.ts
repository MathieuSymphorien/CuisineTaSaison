import { Component, input } from "@angular/core";
import { Food } from "../food/food";
import { FoodModel } from "src/app/Models/food.model";

@Component({
  selector: "app-food-list",
  standalone: true,
  imports: [Food],
  template: `
    <div class="food-list">
      @for (food of foods(); track food.id) {
      <app-food [food]="food"></app-food>
      }
    </div>
  `,
  styles: `
    .food-list {
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  gap: 15px;
  align-items: flex-start;
  max-width: 800px;
  margin: 0 auto;  /* centre le container */
  padding: 0 16px;  /* marges côté sur mobile */
  
}

  `,
})
export class FoodList {
  foods = input<FoodModel[]>();
}
