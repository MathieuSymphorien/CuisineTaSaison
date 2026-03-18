import { Month, MONTHS } from "../../../../shared/models/month.model";
import { Component, inject, signal } from "@angular/core";
import { FoodApiService } from "src/app/features/foods/services/food-api.service";
import { FoodCategory } from "src/app/shared/models/food.model";
import {
  MultiSelectComponent,
  SelectOption,
} from "src/app/shared/components/filter/multi-select/multi-select";
import { FilterStringComponent } from "src/app/shared/components/filter/filter-string/filter-string";
import { SingleSelectComponent } from "src/app/shared/components/filter/filter-select/filter-select";

const FOOD_CATEGORIES: FoodCategory[] = [
  "LEGUME",
  "FRUIT",
  "CEREALE",
  "VIANDE",
  "POISSON",
  "LACTE",
  "EPICE",
  "AUTRE",
];

@Component({
  selector: "app-food-proposal",
  imports: [MultiSelectComponent, FilterStringComponent, SingleSelectComponent],
  templateUrl: "./food-proposal.html",
  styleUrls: ["./food-proposal.css"],
})
export class FoodProposal {
  private readonly foodApiService = inject(FoodApiService);

  readonly monthOptions: SelectOption<Month>[] = MONTHS.map((m) => ({
    label: m,
    value: m,
  }));

  categoryOptions: SelectOption<FoodCategory>[] = FOOD_CATEGORIES.map((c) => ({
    label: c,
    value: c,
  }));

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

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  onCategoryChange(event: FoodCategory) {
    this.category.set(event || null);
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
          this.months.set([]);
        },
        error: () => {
          this.errorMessage.set("Erreur lors de la soumission");
          this.isSubmitting.set(false);
        },
      });
  }
}
