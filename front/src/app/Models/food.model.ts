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
  image: string; // FEATURE IMAGE POUR PLUS TARD
  months: Month[];
  approved: boolean;
}
