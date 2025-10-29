import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { MockDataService } from "src/app/Services/mock-data";
import { FoodList } from "src/app/Core/food-list/food-list";
import { FoodModel } from "src/app/Models/food.model";
import { RecipeModel } from "src/app/Models/recipe.model";
import { RecipeCarousel } from "src/app/Core/recipe-carousel/recipe-carousel";

@Component({
  selector: "app-home",
  imports: [Header, FoodList, RecipeCarousel],
  templateUrl: "./home.html",
  styleUrls: ["./home.css"],
})
export class Home {
  foods: FoodModel[] = [];
  recipes: RecipeModel[] = [];
  season = "season";
  month = "oct";

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.season = this.mockData.getSeason().season;
    this.month = this.mockData.getMonth().month;
    this.foods = this.mockData.getFoods();
    this.recipes = this.mockData.getRecipes();
  }
}
