import { FoodModel } from "./food.model";

export interface RecipeModel {
  id: number;
  name: string;
  description: string;
  preparationTime: number; // minutes
  bakeTime: number; // minutes
  restTime: number; // minutes
  oven: boolean;
  people: number;
  steps: string[];
  foods: FoodModel[];
  image: string; // FEATURE IMAGE POUR PLUS TARD
  // seasonRatio?: number;
  approved: boolean;
}

export interface CreateRecipeDto {
  name: string;
  description: string;
  preparationTime: number;
  bakeTime: number;
  restTime: number;
  oven: boolean;
  people: number;
  steps: string[];
  foodIds: number[];
  image: string;
  // seasonRatio?: number;
  approved: boolean;
}
