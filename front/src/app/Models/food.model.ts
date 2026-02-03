import { Month } from "./month.model";

export type FoodCategory =
  | "FRUIT"
  | "LEGUME"
  | "VIANDE"
  | "POISSON"
  | "CEREALE"
  | "EPICE"
  | "LACTE"
  | "AUTRE";

export interface FoodModel {
  id: number;
  name: string;
  category: FoodCategory;
  image: string;
  months: Month[];
  approved: boolean;
}

export interface CreateFoodDto {
  name: string;
  category: FoodCategory;
  image: string;
  months: Month[];
  approved: boolean;
}

export interface UpdateFoodDto {
  name?: string;
  category?: FoodCategory;
  image?: string;
  months?: Month[];
  approved?: boolean;
}
