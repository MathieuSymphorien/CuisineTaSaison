import { Component, inject } from "@angular/core";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { FoodList } from "src/app/features/foods/components/food-list/food-list";
import { FoodModel } from "src/app/shared/models/food.model";
import { RecipeModel } from "src/app/shared/models/recipe.model";
import { RecipeCarousel } from "src/app/features/recipes/components/recipe-carousel/recipe-carousel";
import { FoodApiService } from "src/app/features/foods/services/food-api.service";
import { RecipeApiService } from "src/app/features/recipes/services/recipe-api.service";

@Component({
  selector: "app-home",
  imports: [Header, Footer, FoodList, RecipeCarousel],
  templateUrl: "./home.html",
  styleUrls: ["./home.css"],
})
export class Home {
  foods: FoodModel[] = [];
  recipes: RecipeModel[] = [];

  currentMonth: string;

  private readonly foodApiService = inject(FoodApiService);
  private readonly recipeApiService = inject(RecipeApiService);

  ngOnInit(): void {
    this.loadFoods();
    this.loadRecipes();
  }

  loadFoods(): void {
    this.foodApiService.getSeasonalFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des foods:", err);
      },
    });
  }

  loadRecipes(): void {
    this.recipeApiService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des recettes:", err);
      },
    });
  }

  constructor() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    this.currentMonth = date.toLocaleDateString("fr-FR", options);
    this.currentMonth =
      this.currentMonth.charAt(0).toUpperCase() + this.currentMonth.slice(1);
  }
}
