import { Component, inject, OnInit, signal } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";
import { RecipeApiService } from "src/app/Services/recipe-api.service";
import { FoodApiService } from "src/app/Services/food-api.service";
import { FilterStringComponent } from "src/app/Utils/filter/filter-string/filter-string";
import { FilterNumberComponent } from "src/app/Utils/filter/filter-number/filter-number";
import { FilterBooleanComponent } from "src/app/Utils/filter/filter-boolean/filter-boolean";
import { FilterTextareaComponent } from "src/app/Utils/filter/filter-textarea/filter-textarea";
import { FilterMultiSelectComponent } from "src/app/Utils/filter/filter-multi-select/filter-multi-select";

@Component({
  selector: "app-recipe-proposal",
  imports: [
    FilterStringComponent,
    FilterNumberComponent,
    FilterBooleanComponent,
    FilterTextareaComponent,
    FilterMultiSelectComponent,
  ],
  templateUrl: "./recipe-proposal.html",
  styleUrls: ["./recipe-proposal.css"],
})
export class RecipeProposal implements OnInit {
  private readonly recipeApiService = inject(RecipeApiService);
  private readonly foodApiService = inject(FoodApiService);

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  name = signal("");
  description = signal("");
  time = signal(0);
  oven = signal(false);
  people = signal(0);
  stepsText = signal("");
  seasonRatio = signal(0);
  availableFoods = signal<FoodModel[]>([]);
  availableFoodNames = signal<string[]>([]);
  selectedFoodNames = signal<string[]>([]);
  selectedFoodIds = signal<number[]>([]);

  ngOnInit() {
    this.loadAvailableFoods();
  }

  private loadAvailableFoods() {
    this.foodApiService.getAllFoods().subscribe({
      next: (foods) => {
        this.availableFoods.set(foods);
        this.availableFoodNames.set(foods.map((f) => f.name));
      },
      error: (err) => console.error("Erreur chargement aliments:", err),
    });
  }

  onFoodsChange(foodNames: string[]) {
    this.selectedFoodNames.set(foodNames);
    const foodIds = this.availableFoods()
      .filter((f) => foodNames.includes(f.name))
      .map((f) => f.id);
    this.selectedFoodIds.set(foodIds);
  }

  private getStepsArray(): string[] {
    return this.stepsText()
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  private resetForm() {
    this.name.set("");
    this.description.set("");
    this.time.set(0);
    this.oven.set(false);
    this.people.set(0);
    this.stepsText.set("");
    this.selectedFoodNames.set([]);
    this.selectedFoodIds.set([]);
    this.seasonRatio.set(0);
  }

  submitProposal() {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const steps = this.getStepsArray();

    // Validation
    if (
      !this.name() ||
      !this.description() ||
      this.time() <= 0 ||
      this.people() <= 0 ||
      steps.length === 0 ||
      this.selectedFoodIds().length === 0
    ) {
      this.errorMessage.set("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    this.isSubmitting.set(true);
    console.log(this.name());
    console.log(this.description());
    console.log(this.time());
    console.log(this.oven());
    console.log(this.people());
    console.log(steps);
    console.log(this.selectedFoodIds());
    console.log(this.seasonRatio());

    this.recipeApiService
      .createRecipe({
        name: this.name(),
        description: this.description(),
        time: this.time(),
        oven: this.oven(),
        people: this.people(),
        steps: steps,
        foodIds: this.selectedFoodIds(),
        seasonRatio: this.seasonRatio(),
        image: "",
        approved: false,
      })
      .subscribe({
        next: () => {
          this.successMessage.set("Merci pour votre proposition de recette !");
          this.resetForm();
          this.isSubmitting.set(false);
        },
        error: () => {
          this.errorMessage.set(
            "Une erreur est survenue lors de la soumission.",
          );
          this.isSubmitting.set(false);
        },
      });
  }
}
