import { Component, input } from "@angular/core";
import { FoodModel } from "src/app/shared/models/food.model";
import { MONTHS, Month } from "src/app/shared/models/month.model";

@Component({
  selector: "app-seasonality-table",
  standalone: true,
  templateUrl: "./seasonality-table.html",
  styleUrls: ["./seasonality-table.css"],
})
export class SeasonalityTable {
  foods = input<FoodModel[]>([]);
  months: Month[] = MONTHS;

  hasMonth(food: FoodModel, month: Month): boolean {
    return food?.months?.includes(month);
  }

  formatMonth(month: Month): string {
    return month.charAt(0) + month.slice(1).toLowerCase();
  }
}
