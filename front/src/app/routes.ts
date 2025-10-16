import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { RecipePage } from "./recipe-page/recipe-page";

const routeConfig: Routes = [
  {
    path: "",
    component: Home,
    title: "Accueil",
  },
  {
    path: "recipe",
    component: RecipePage,
    title: "Recette",
  },
];
export default routeConfig;
