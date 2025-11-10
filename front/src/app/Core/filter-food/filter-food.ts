import { FoodCategory } from "./../../Models/food.model";
import { Component, output, signal } from "@angular/core";
import { Month } from "src/app/Models/month.model";
import { FilterMonthComponent } from "src/app/Utils/filter/filter-month/filter-month";
import { FilterMultiSelectComponent } from "src/app/Utils/filter/filter-multi-select/filter-multi-select";
import { FilterStringComponent } from "src/app/Utils/filter/filter-string/filter-string";

@Component({
  selector: "app-filter-food",
  imports: [
    FilterStringComponent,
    FilterMonthComponent,
    FilterMultiSelectComponent,
  ],
  template: `
    <app-filter-string
      label="Nom de la recette"
      (valueChange)="onSearchChange($event)"
    ></app-filter-string>
    <app-filter-month
      label="Mois"
      (valueChange)="onMonthsChange($event)"
    ></app-filter-month>
    <app-filter-multi-select
      label="Catégories"
      [options]="foodCategory()"
      (valueChange)="onCategoryChange($event)"
    ></app-filter-multi-select>
  `,
  styles: ``,
})
export class FilterFood {
  filtersChange = output<any>();
  foodCategory = signal<string[]>(
    "Légume,Fruit,Céréale,Viande,Poisson,Produit laitier,Epice".split(",")
  );

  filters = signal({
    name: "",
    categories: [] as FoodCategory[],
    months: [] as Month[],
  });

  onSearchChange(value: string) {
    this.filters.update((f) => ({ ...f, name: value }));
    this.updateFilters();
  }
  onMonthsChange(value: Month[]) {
    this.filters.update((f) => ({ ...f, months: value }));
    this.updateFilters();
  }

  onCategoryChange(value: string[]) {
    this.filters.update((f) => ({ ...f, categories: value as FoodCategory[] }));
    this.updateFilters();
  }

  updateFilters() {
    this.filtersChange.emit(this.filters());
  }
}
