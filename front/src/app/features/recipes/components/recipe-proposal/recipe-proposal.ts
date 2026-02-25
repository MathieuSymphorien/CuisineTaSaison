import { Component, inject, OnInit, signal } from "@angular/core";
import { RecipeApiService } from "src/app/features/recipes/services/recipe-api.service";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { FilterStringComponent } from "src/app/shared/components/filter/filter-string/filter-string";
import { FilterNumberComponent } from "src/app/shared/components/filter/filter-number/filter-number";
import { FilterBooleanComponent } from "src/app/shared/components/filter/filter-boolean/filter-boolean";
import { FilterTextareaComponent } from "src/app/shared/components/filter/filter-textarea/filter-textarea";
import { RecipeFoodControl } from "src/app/shared/components/recipe-food/recipe-food";
import {
  RecipeFoodRequest,
  RecipeFoodResponse,
} from "src/app/shared/models/recipe.model";

@Component({
  selector: "app-recipe-proposal",
  imports: [
    FilterStringComponent,
    FilterNumberComponent,
    FilterBooleanComponent,
    FilterTextareaComponent,
    RecipeFoodControl,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: "./recipe-proposal.html",
  styleUrls: ["./recipe-proposal.css"],
})
export class RecipeProposal {
  private readonly recipeApiService = inject(RecipeApiService);

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  name = signal("");
  description = signal("");
  preparationTime = signal(0);
  bakeTime = signal(0);
  restTime = signal(0);
  oven = signal(false);
  people = signal(0);
  stepsText = signal("");

  recipeFoodResponses = signal<RecipeFoodResponse[]>([]);
  recipeFoodRequests = signal<RecipeFoodRequest[]>([]);

  private getStepsArray(): string[] {
    return this.stepsText()
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  private resetForm() {
    this.name.set("");
    this.description.set("");
    this.preparationTime.set(0);
    this.bakeTime.set(0);
    this.restTime.set(0);
    this.oven.set(false);
    this.people.set(0);
    this.stepsText.set("");
  }

  submitProposal() {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const steps = this.getStepsArray();

    // Validation
    if (
      !this.name() ||
      !this.description() ||
      this.preparationTime() <= 0 ||
      this.bakeTime() <= 0 ||
      this.restTime() < 0 ||
      this.people() <= 0 ||
      steps.length === 0 ||
      this.recipeFoodRequests().length === 0
    ) {
      this.errorMessage.set("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    this.isSubmitting.set(true);

    this.recipeApiService
      .createRecipe({
        name: this.name(),
        description: this.description(),
        preparationTime: this.preparationTime(),
        bakeTime: this.bakeTime(),
        restTime: this.restTime(),
        oven: this.oven(),
        people: this.people(),
        steps: steps,
        recipeFoods: this.recipeFoodRequests(),
        // seasonRatio: this.seasonRatio(),
        image: "",
        approved: false,
      })
      .subscribe({
        next: () => {
          this.successMessage.set(
            "Merci pour votre proposition de recette ! Un admin la validera prochainement.",
          );
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
