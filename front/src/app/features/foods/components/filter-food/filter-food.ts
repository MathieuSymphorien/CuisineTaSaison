import { FoodCategory } from "../../../../shared/models/food.model";
import { Component, output, signal } from "@angular/core";
import { Month, MONTHS } from "src/app/shared/models/month.model";
import {
  MultiSelectComponent,
  SelectOption,
} from "src/app/shared/components/filter/multi-select/multi-select";
import { FilterStringComponent } from "src/app/shared/components/filter/filter-string/filter-string";

export interface FoodFilterValues {
  name: string;
  categories: FoodCategory[];
  months: Month[];
}

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
  selector: "app-filter-food",
  imports: [FilterStringComponent, MultiSelectComponent],
  styleUrls: ["./filter-food.css"],
  template: `
    <div class="filters-container">
      <h2 class="filters-title">Filtres des aliments</h2>

      <div class="filters-grid">
        <div class="filter-card">
          <app-filter-string
            label="Nom de l'aliment"
            (valueChange)="onSearchChange($event)"
          ></app-filter-string>
        </div>

        <div class="filter-card wide">
          <app-multi-select
            label="Mois de disponibilité"
            [options]="monthOptions"
            (valueChange)="onMonthsChange($event)"
          ></app-multi-select>
        </div>

        <div class="filter-card">
          <app-multi-select
            label="Catégories"
            [options]="categoryOptions"
            (valueChange)="onCategoryChange($event)"
          ></app-multi-select>
        </div>
      </div>
    </div>
  `,
})
export class FilterFood {
  filtersChange = output<FoodFilterValues>();

  monthOptions: SelectOption<Month>[] = MONTHS.map((m) => ({
    label: m,
    value: m,
  }));
  categoryOptions: SelectOption<FoodCategory>[] = FOOD_CATEGORIES.map((c) => ({
    label: c,
    value: c,
  }));

  filters = signal<FoodFilterValues>({
    name: "",
    categories: [],
    months: [],
  });

  onSearchChange(value: string): void {
    this.filters.update((f) => ({ ...f, name: value }));
    this.updateFilters();
  }

  onMonthsChange(value: Month[]): void {
    this.filters.update((f) => ({ ...f, months: value }));
    this.updateFilters();
  }

  onCategoryChange(value: FoodCategory[]): void {
    this.filters.update((f) => ({ ...f, categories: value }));
    this.updateFilters();
  }

  private updateFilters(): void {
    this.filtersChange.emit(this.filters());
  }
}
