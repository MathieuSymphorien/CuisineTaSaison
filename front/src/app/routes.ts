import { Routes } from "@angular/router";
import { Home } from "./Pages/home/home";
import { RecipePage } from "./Pages/recipe-page/recipe-page";
import { LoginPage } from "./Pages/login-page/login-page";
import { ProposalPage } from "./Pages/proposal-page/proposal-page";
import { FoodPage } from "./Pages/food-page/food-page";
import { AdminGuard } from "./Services/admin.guard";
import { AdminPage } from "./Pages/admin-page/admin-page";

const routeConfig: Routes = [
  {
    path: "",
    component: Home,
    title: "Accueil",
  },
  {
    path: "recette",
    component: RecipePage,
    title: "Recette",
  },
  {
    path: "aliment",
    component: FoodPage,
    title: "Aliment",
  },
  {
    path: "connexion",
    component: LoginPage,
    title: "Connexion",
  },
  {
    path: "admin",
    component: AdminPage,
    title: "Administration",
    canActivate: [AdminGuard],
  },
  {
    path: "proposition",
    component: ProposalPage,
    title: "Proposition",
  },
];
export default routeConfig;
