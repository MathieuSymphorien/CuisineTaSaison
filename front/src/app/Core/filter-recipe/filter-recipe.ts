import { Component, output, signal } from "@angular/core";
import { FilterStringComponent } from "src/app/Utils/filter/filter-string/filter-string";
import { FilterBooleanComponent } from "src/app/Utils/filter/filter-boolean/filter-boolean";
import { FilterMultiSelectComponent } from "src/app/Utils/filter/filter-multi-select/filter-multi-select";
import { FilterRangeComponent } from "src/app/Utils/filter/filter-range/filter-range";
import { FilterMonthComponent } from "src/app/Utils/filter/filter-month/filter-month";
import { Month, MONTHS } from "src/app/Models/month.model";

export interface RecipeFilterValues {
  name: string;
  time: { min: number; max: number };
  include: string[];
  exclude: string[];
  months: Month[];
  oven: boolean;
}

@Component({
  selector: "app-filter-recipe",
  standalone: true,
  imports: [
    FilterStringComponent,
    FilterBooleanComponent,
    FilterMultiSelectComponent,
    FilterRangeComponent,
    FilterMonthComponent,
  ],
  templateUrl: "./filter-recipe.html",
  styleUrls: ["./filter-recipe.css"],
})
export class FilterRecipe {
  searchText = signal("");
  ingredients = signal<string[]>(["Tomate", "Radis", "Pêche", "Concombre"]);
  months = signal<Month[]>(Object.keys(MONTHS) as Month[]);

  filtersChange = output<RecipeFilterValues>();
  filters = signal<RecipeFilterValues>({
    name: "",
    time: { min: 0, max: 45 },
    include: [],
    exclude: [],
    months: [],
    oven: false,
  });

  onSearchChange(value: string): void {
    this.filters.update((f) => ({ ...f, name: value }));
    this.updateFilters();
  }

  onOvenChange(value: boolean): void {
    this.filters.update((f) => ({ ...f, oven: value }));
    this.updateFilters();
  }

  onIngredientsChange(value: string[]): void {
    this.filters.update((f) => ({ ...f, include: value }));
    this.updateFilters();
  }

  onTimeChange(value: { min: number; max: number }): void {
    this.filters.update((f) => ({ ...f, time: value }));
    this.updateFilters();
  }

  onMonthsChange(value: Month[]): void {
    this.filters.update((f) => ({ ...f, months: value }));
    this.updateFilters();
  }

  private updateFilters(): void {
    this.filtersChange.emit(this.filters());
  }
}
