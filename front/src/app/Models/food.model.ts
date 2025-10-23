export type FoodCategory =
  | "fruit"
  | "legume"
  | "viande"
  | "poisson"
  | "cereale"
  | "epice"
  | "lacte";

export interface FoodModel {
  id: number;
  name: string;
  category: FoodCategory;
  image: string;
  seasonMonths?: number[]; // optionnel pour plus tard
}
