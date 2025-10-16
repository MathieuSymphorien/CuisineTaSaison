import { Component, input } from "@angular/core";
import { Food } from "../food/food";
import { FoodModel } from "src/app/Models/food.model";

@Component({
  selector: "app-food-list",
  standalone: true,
  imports: [Food],
  template: ` <div>
    @for (food of foods(); track food.id) {
    <app-food [food]="food"></app-food>
    }
  </div>`,
  styles: ``,
})
export class FoodList {
  foods = input<FoodModel[]>();
}
