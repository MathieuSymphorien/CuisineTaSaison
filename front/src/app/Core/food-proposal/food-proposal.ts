import { Month } from "./../../Models/month.model";
import { Component, inject, signal } from "@angular/core";
import { FoodApiService } from "src/app/Services/food-api.service";
import { FoodCategory } from "src/app/Models/food.model";
import { FilterMonthComponent } from "src/app/Utils/filter/filter-month/filter-month";
import { FilterMultiSelectComponent } from "src/app/Utils/filter/filter-multi-select/filter-multi-select";
import { FilterStringComponent } from "src/app/Utils/filter/filter-string/filter-string";

@Component({
  selector: "app-food-proposal",
  imports: [
    FilterMonthComponent,
    FilterMultiSelectComponent,
    FilterStringComponent,
  ],
  templateUrl: "./food-proposal.html",
  styleUrls: ["./food-proposal.css"],
})
export class FoodProposal {
  private readonly foodApiService = inject(FoodApiService);

  readonly foodCategories: FoodCategory[] = [
    "LEGUME",
    "FRUIT",
    "CEREALE",
    "VIANDE",
    "POISSON",
    "LACTE",
    "EPICE",
    "AUTRE",
  ];

  name = signal("");
  category = signal<FoodCategory | null>(null);
  months = signal<Month[]>([]);

  // Pour le binding avec le multi-select (qui attend un string[])
  selectedCategories = signal<string[]>([]);

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  onCategoryChange(event: string[]) {
    this.selectedCategories.set(event);
    this.category.set(event.length > 0 ? (event[0] as FoodCategory) : null);
  }

  onMonthsChange(event: Month[]) {
    this.months.set(event);
  }

  onSearchChange(event: string) {
    this.name.set(event);
  }

  submitProposal() {
    // Reset des messages
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Validation
    if (!this.name() || !this.category()) {
      this.errorMessage.set("Veuillez remplir le nom et la catégorie");
      return;
    }

    if (this.months().length === 0) {
      this.errorMessage.set("Veuillez sélectionner au moins un mois");
      return;
    }

    this.isSubmitting.set(true);

    this.foodApiService
      .createFood({
        name: this.name(),
        category: this.category()!,
        months: this.months(),
        image: "",
        approved: false,
      })
      .subscribe({
        next: () => {
          this.successMessage.set("Proposition soumise avec succès !");
          this.isSubmitting.set(false);
          // Reset du formulaire
          this.name.set("");
          this.category.set(null);
          this.selectedCategories.set([]);
          this.months.set([]);
        },
        error: () => {
          this.errorMessage.set("Erreur lors de la soumission");
          this.isSubmitting.set(false);
        },
      });
  }
}
