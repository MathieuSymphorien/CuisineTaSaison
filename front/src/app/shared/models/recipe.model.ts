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
  recipeFoods: RecipeFoodResponse[];
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
  recipeFoods: RecipeFoodRequest[];
}

export interface UpdateRecipeDto {
  name: string;
  description: string;
  preparationTime: number;
  bakeTime: number;
  restTime: number;
  oven: boolean;
  people: number;
  steps: string[];
  recipeFoods: RecipeFoodRequest[];
}

export interface RecipeFoodRequest {
  foodId: number;
  quantity: number;
  unit: string;
}

export interface RecipeFoodResponse {
  foodId: number;
  foodName: string;
  quantity: number;
  unit: string;
}
