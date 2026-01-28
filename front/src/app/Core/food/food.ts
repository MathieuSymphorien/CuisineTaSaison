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
      case "FRUIT":
        return "#7BC67B"; // vert
      case "LEGUME":
        return "#4AA3DF"; // bleu
      case "VIANDE":
        return "#D9534F"; // rouge
      case "POISSON":
        return "#5BC0DE"; // turquoise
      case "CEREALE":
        return "#C5A880"; // brun
      case "EPICE":
        return "#F0AD4E"; // orange
      case "LACTE":
        return "#F7E9D0"; // crème
      default:
        return "#AAAAAA";
    }
  }
}
