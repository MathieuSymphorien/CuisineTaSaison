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
  template: `
    <div class="proposal-form">
      <div class="filter-card">
        <app-filter-string
          label="Nom de l'aliment"
          [value]="name()"
          (valueChange)="onSearchChange($event)"
        ></app-filter-string>
      </div>

      <div class="filter-card">
        <app-filter-multi-select
          label="Catégories"
          [options]="foodCategories"
          [value]="selectedCategories()"
          (valueChange)="onCategoryChange($event)"
        ></app-filter-multi-select>
      </div>

      <div>
        <app-filter-month
          label="Mois de disponibilité"
          [value]="months()"
          (valueChange)="onMonthsChange($event)"
        ></app-filter-month>
      </div>

      <button
        class="submit-button"
        [disabled]="isSubmitting()"
        (click)="submitProposal()"
      >
        @if (isSubmitting()) {
          Envoi en cours...
        } @else {
          Proposer cet ingrédient
        }
      </button>

      @if (errorMessage()) {
        <div class="message error">{{ errorMessage() }}</div>
      }

      @if (successMessage()) {
        <div class="message success">{{ successMessage() }}</div>
      }
    </div>
  `,
  styles: `
    .proposal-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .message {
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: 500;
    }

    .message.error {
      background-color: #fee2e2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    .message.success {
      background-color: #dcfce7;
      color: #16a34a;
      border: 1px solid #bbf7d0;
    }

    .submit-button {
      width: 100%;
      padding: 16px;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition:
        background-color var(--transition-normal),
        transform var(--transition-fast);
      margin-top: var(--spacing-md);
    }

    .submit-button:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
      transform: translateY(-2px);
    }

    .submit-button:active:not(:disabled) {
      transform: scale(0.98);
    }

    .submit-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `,
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
