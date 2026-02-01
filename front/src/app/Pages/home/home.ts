import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { MockDataService } from "src/app/Services/mock-data";
import { FoodList } from "src/app/Core/food-list/food-list";
import { FoodModel } from "src/app/Models/food.model";
import { RecipeModel } from "src/app/Models/recipe.model";
import { RecipeCarousel } from "src/app/Core/recipe-carousel/recipe-carousel";
import { FoodApiService } from "src/app/Services/food-api.service";

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

  constructor(
    private FoodApiService: FoodApiService,
    private mockData: MockDataService,
  ) {}

  ngOnInit(): void {
    this.loadFoods();
    this.season = this.mockData.getSeason().season;
    //   this.month = this.mockData.getMonth().month;
    this.recipes = this.mockData.getRecipes();
  }

  loadFoods(): void {
    this.FoodApiService.getSeasonalFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des foods:", err);
      },
    });
  }

  // constructor(private mockData: MockDataService) {}
  // ngOnInit() {
  //   this.foods = this.mockData.getFoods();
  // }
}
