import { FoodModel } from "./food.model";

export interface RecipeModel {
  id: number;
  name: string;
  description: string;
  time: number; // minutes
  oven: boolean;
  people: number;
  steps: string[];
  foods: FoodModel[]; // relation vers tes aliments
  image: string;
}
