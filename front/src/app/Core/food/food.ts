import { Component, input } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";

@Component({
  selector: "app-food",
  standalone: true,
  imports: [],
  template: `
    <div>
      <h3>{{ food()?.name }}</h3>
      <p ngIf="food()?.description">{{ food()?.description }}</p>
    </div>
  `,
  styles: ``,
})
export class Food {
  food = input<FoodModel>();
}
