import { Injectable } from "@angular/core";
import { FoodModel } from "src/app/shared/models/food.model";
import { RecipeModel } from "src/app/shared/models/recipe.model";

//En attendant de consommer une vraie API
@Injectable({ providedIn: "root" })
export class MockDataService {
  getFoods(): FoodModel[] {
    return [
      {
        id: 1,
        name: "Pomme",
        category: "FRUIT",
        image: "assets/pomme.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
        approved: true,
      },
      {
        id: 2,
        name: "Pomme2",
        category: "FRUIT",
        image: "assets/pomme.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
        approved: false,
      },
      {
        id: 3,
        name: "patate",
        category: "LEGUME",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
        approved: true,
      },
    ];
  }

  getRecipes(): RecipeModel[] {
    return [
      {
        id: 1,
        name: "Salade de pommes de terre",
        description: "Une salade estivale fraîche et savoureuse",
        preparationTime: 45,
        bakeTime: 0,
        restTime: 0,
        oven: false,
        people: 4,
        steps: [
          "Cuire les pommes de terre",
          "Couper les légumes",
          "Mélanger avec la sauce",
        ],
        foods: this.getRecipe1(),
        image: "assets/images/recette-salade.png",
        approved: true,
      },
    ];
  }

  getRecipe1(): FoodModel[] {
    return [
      {
        id: 1,
        name: "Pomme",
        category: "FRUIT",
        image: "assets/pomme.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
        approved: true,
      },
    ];
  }

  getRecipe2(): FoodModel[] {
    return [
      {
        id: 1,
        name: "poulet",
        category: "FRUIT",
        image: "assets/pomme.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
        approved: true,
      },
      {
        id: 3,
        name: "Patate",
        category: "LEGUME",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
        approved: true,
      },
    ];
  }

  getSeason() {
    return {
      season: "Automne",
    };
  }

  getMonth() {
    return {
      month: "Sept - Nov",
    };
  }
}
