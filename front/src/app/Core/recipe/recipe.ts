import { Component, input } from "@angular/core";
import { RecipeModel } from "src/app/Models/recipe.model";
@Component({
  selector: "app-recipe",
  imports: [],
  templateUrl: "./recipe.html",
  styleUrls: ["./recipe.css"],
})
export class Recipe {
  recipe = input<RecipeModel>();
}
