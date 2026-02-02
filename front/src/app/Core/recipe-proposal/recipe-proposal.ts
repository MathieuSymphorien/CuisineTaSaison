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
  template: `
    <div class="proposal-form">
      @if (errorMessage()) {
        <div class="message error">{{ errorMessage() }}</div>
      }
      @if (successMessage()) {
        <div class="message success">{{ successMessage() }}</div>
      }

      <app-filter-string
        label="Nom de la recette"
        [value]="name()"
        (valueChange)="name.set($event)"
      ></app-filter-string>

      <app-filter-textarea
        label="Description"
        [value]="description()"
        placeholder="Décrivez votre recette..."
        [rows]="4"
        (valueChange)="description.set($event)"
      ></app-filter-textarea>

      <div class="form-row">
        <app-filter-number
          label="Temps de préparation (minutes)"
          [value]="time()"
          [min]="1"
          placeholder="30"
          (valueChange)="time.set($event)"
        ></app-filter-number>

        <app-filter-number
          label="Nombre de personnes"
          [value]="people()"
          [min]="1"
          placeholder="4"
          (valueChange)="people.set($event)"
        ></app-filter-number>
      </div>

      <app-filter-boolean
        label="Utilisation du four"
        [value]="oven()"
        (valueChange)="oven.set($event)"
      ></app-filter-boolean>

      <app-filter-textarea
        label="Étapes de la recette"
        [value]="stepsText()"
        placeholder="Étape 1: ...&#10;Étape 2: ..."
        [rows]="6"
        hint="Séparez chaque étape par un retour à la ligne"
        (valueChange)="stepsText.set($event)"
      ></app-filter-textarea>

      <app-filter-multi-select
        label="Ingrédients"
        [options]="availableFoodNames()"
        [value]="selectedFoodNames()"
        (valueChange)="onFoodsChange($event)"
      ></app-filter-multi-select>

      <app-filter-number
        label="Ratio de saisonnalité (optionnel, 0-100)"
        [value]="seasonRatio()"
        [min]="0"
        [max]="100"
        placeholder="0-100"
        (valueChange)="seasonRatio.set($event)"
      ></app-filter-number>

      <button
        class="submit-button"
        (click)="submitProposal()"
        [disabled]="isSubmitting()"
      >
        @if (isSubmitting()) {
          Envoi en cours...
        } @else {
          Proposer cette recette
        }
      </button>
    </div>
  `,
  styles: `
    .proposal-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-lg);
    }

    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    .message {
      padding: 12px 16px;
      border-radius: var(--radius-md);
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
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
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
