import { Injectable } from "@angular/core";
import { FoodModel } from "../Models/food.model";

@Injectable({ providedIn: "root" })
export class MockDataService {
  getFoods(): FoodModel[] {
    return [
      {
        id: 1,
        name: "Pomme",
        description: "Riche en fibres",
      },
      {
        id: 2,
        name: "Viande",
        description: "Source d’énergie rapide",
      },
      {
        id: 3,
        name: "Patate",
        description: "Délicieuse en été",
      },
    ];
  }

  getRecipes() {
    return [
      {
        id: 1,
        name: "Tarte aux pommes",
        description: "Classique et savoureuse",
      },
      {
        id: 2,
        name: "Smoothie banane-fraise",
        description: "Idéal pour le matin",
      },
    ];
  }
}
