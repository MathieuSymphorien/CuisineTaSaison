import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { RecipePage } from "./pages/recipe-page/recipe-page";
import { LoginPage } from "./pages/login-page/login-page";
import { ProposalPage } from "./pages/proposal-page/proposal-page";
import { FoodPage } from "./pages/food-page/food-page";
import { AdminGuard } from "./core/guards/admin.guard";
import { AdminPage } from "./pages/admin-page/admin-page";

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
