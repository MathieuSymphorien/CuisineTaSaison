import { Component, input } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";

@Component({
  selector: "app-food",
  standalone: true,
  templateUrl: "./food.html",
  styleUrls: ["./food.css"],
})
export class Food {
  food = input<FoodModel>();

  getBackgroundColor(category: FoodModel["category"] | undefined): string {
    switch (category) {
      case "fruit":
        return "#7BC67B"; // vert
      case "legume":
        return "#4AA3DF"; // bleu
      case "viande":
        return "#D9534F"; // rouge
      case "poisson":
        return "#5BC0DE"; // turquoise
      case "cereale":
        return "#C5A880"; // brun
      case "epice":
        return "#F0AD4E"; // orange
      case "lacte":
        return "#F7E9D0"; // crème
      default:
        return "#AAAAAA";
    }
  }
}
