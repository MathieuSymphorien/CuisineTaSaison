import { Injectable } from "@angular/core";
import { FoodModel } from "../Models/food.model";
import { RecipeModel } from "../Models/recipe.model";

@Injectable({ providedIn: "root" })
export class MockDataService {
  getFoods(): FoodModel[] {
    return [
      {
        id: 1,
        name: "Pomme",
        category: "fruit",
        image: "assets/pomme.jpg",
        seasonMonths: [9, 10, 11, 12],
      },
      {
        id: 2,
        name: "Poulet",
        category: "viande",
        image: "assets/poulet.jpg",
        seasonMonths: [1, 2, 3, 12],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "poisson",
        category: "poisson",
        image: "assets/poisson.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "blé",
        category: "cereale",
        image: "assets/cereale.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "curry",
        category: "epice",
        image: "assets/epice.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "lait",
        category: "lacte",
        image: "assets/lactose.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
    ];
  }

  getRecipes(): RecipeModel[] {
    return [
      {
        id: 1,
        name: "Salade de pommes de terre",
        description: "Une salade estivale fraîche et savoureuse",
        time: 45,
        oven: false,
        people: 4,
        steps: [
          "Cuire les pommes de terre",
          "Couper les légumes",
          "Mélanger avec la sauce",
        ],
        foods: this.getRecipe1(),
        image: "assets/images/recette-salade.png",
      },
      {
        id: 2,
        name: "Poulet rôti",
        description: "Recette classique, croustillante et juteuse",
        time: 60,
        oven: true,
        people: 4,
        steps: [
          "Assaisonner le poulet",
          "Enfourner 1h à 180°C",
          "Laisser reposer 10 min",
        ],
        foods: this.getRecipe2(),
        image: "assets/images/poulet-roti.png",
      },
    ];
  }

  getRecipe1(): FoodModel[] {
    return [
      {
        id: 1,
        name: "Pomme",
        category: "fruit",
        image: "assets/pomme.jpg",
        seasonMonths: [9, 10, 11, 12],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
      },
    ];
  }

  getRecipe2(): FoodModel[] {
    return [
      {
        id: 1,
        name: "poulet",
        category: "fruit",
        image: "assets/pomme.jpg",
        seasonMonths: [9, 10, 11, 12],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        seasonMonths: [8, 9, 10],
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
