import { Component, inject, AfterViewInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { FoodList } from "src/app/features/foods/components/food-list/food-list";
import { FoodModel } from "src/app/shared/models/food.model";
import { RecipeModel } from "src/app/shared/models/recipe.model";
import { RecipeCarousel } from "src/app/features/recipes/components/recipe-carousel/recipe-carousel";
import { FoodApiService } from "src/app/features/foods/services/food-api.service";
import { RecipeApiService } from "src/app/features/recipes/services/recipe-api.service";
import { SeoService } from "src/app/core/services/seo.service";

@Component({
  selector: "app-home",
  imports: [Header, Footer, FoodList, RecipeCarousel, RouterLink],
  templateUrl: "./home.html",
  styleUrls: ["./home.css"],
})
export class Home implements AfterViewInit {
  foods: FoodModel[] = [];
  recipes: RecipeModel[] = [];
  currentSeason: string;
  currentMonth: string;
  emoji: string;

  private readonly foodApiService = inject(FoodApiService);
  private readonly recipeApiService = inject(RecipeApiService);
  private readonly seoService = inject(SeoService);

  constructor() {
    this.seoService.update({
      title: "Accueil",
      description: "Découvrez les aliments et recettes de saison. Mangez local, mangez frais, respectez les saisons.",
      url: "/",
    });
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    this.currentMonth = date.toLocaleDateString("fr-FR", options);
    this.currentMonth =
      this.currentMonth.charAt(0).toUpperCase() + this.currentMonth.slice(1);
    this.currentSeason = document.body.getAttribute("data-season") || "";
    this.emoji = document.body.getAttribute("emoji-season") || "";
  }

  ngOnInit(): void {
    this.loadFoods();
    this.loadRecipes();
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  loadFoods(): void {
    this.foodApiService.getSeasonalFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des foods:", err);
      },
    });
  }

  loadRecipes(): void {
    this.recipeApiService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des recettes:", err);
      },
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });
  }
}
