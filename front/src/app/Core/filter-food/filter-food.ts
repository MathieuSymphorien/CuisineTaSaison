import { FoodCategory } from "./../../Models/food.model";
import { Component, output, signal } from "@angular/core";
import { Month } from "src/app/Models/month.model";
import { FilterMonthComponent } from "src/app/Utils/filter/filter-month/filter-month";
import { FilterMultiSelectComponent } from "src/app/Utils/filter/filter-multi-select/filter-multi-select";
import { FilterStringComponent } from "src/app/Utils/filter/filter-string/filter-string";

export interface FoodFilterValues {
  name: string;
  categories: FoodCategory[];
  months: Month[];
}

@Component({
  selector: "app-filter-food",
  imports: [
    FilterStringComponent,
    FilterMonthComponent,
    FilterMultiSelectComponent,
  ],
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
          <app-filter-month
            label="Mois de disponibilité"
            (valueChange)="onMonthsChange($event)"
          ></app-filter-month>
        </div>

        <div class="filter-card">
          <app-filter-multi-select
            label="Catégories"
            [options]="foodCategory()"
            (valueChange)="onCategoryChange($event)"
          ></app-filter-multi-select>
        </div>
      </div>
    </div>
  `,
})
export class FilterFood {
  filtersChange = output<FoodFilterValues>();
  foodCategory = signal<string[]>(
    "LEGUME,FRUIT,CEREALE,VIANDE,POISSON,LACTE,EPICE,AUTRE".split(","),
  );

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

  onCategoryChange(value: string[]): void {
    this.filters.update((f) => ({ ...f, categories: value as FoodCategory[] }));
    this.updateFilters();
  }

  private updateFilters(): void {
    this.filtersChange.emit(this.filters());
  }
}
