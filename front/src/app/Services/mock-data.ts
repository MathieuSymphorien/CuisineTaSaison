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
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 2,
        name: "Poulet",
        category: "viande",
        image: "assets/poulet.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "poisson",
        category: "poisson",
        image: "assets/poisson.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "blé",
        category: "cereale",
        image: "assets/cereale.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "curry",
        category: "epice",
        image: "assets/epice.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "lait",
        category: "lacte",
        image: "assets/lactose.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },

      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
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
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
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
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
      },
      {
        id: 3,
        name: "Patate",
        category: "legume",
        image: "assets/patate.jpg",
        months: ["DECEMBRE", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI"],
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
