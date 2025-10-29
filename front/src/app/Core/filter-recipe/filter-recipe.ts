import { Component, output, signal } from "@angular/core";
import { FilterStringComponent } from "src/app/Utils/filter/filter-string/filter-string";
import { FilterBooleanComponent } from "src/app/Utils/filter/filter-boolean/filter-boolean";
import { FilterMultiSelectComponent } from "src/app/Utils/filter/filter-multi-select/filter-multi-select";
import { FilterRangeComponent } from "src/app/Utils/filter/filter-range/filter-range";
import { FilterSeasonComponent } from "src/app/Utils/filter/filter-season/filter-season";
import { SEASONS, Season } from "src/app/Models/season.model";

@Component({
  selector: "app-filter-recipe",
  standalone: true, // ✅ important si tu veux l’importer directement dans une page standalone
  imports: [
    FilterStringComponent,
    FilterBooleanComponent,
    FilterMultiSelectComponent,
    FilterRangeComponent,
    FilterSeasonComponent,
  ],
  template: `
    <app-filter-string
      label="Nom de la recette"
      (valueChange)="onSearchChange($event)"
    >
    </app-filter-string>

    <app-filter-boolean
      label="Cuit au four"
      (valueChange)="onOvenChange($event)"
    >
    </app-filter-boolean>

    <app-filter-multi-select
      label="Ingrédients"
      [options]="ingredients()"
      (valueChange)="onIngredientsChange($event)"
    >
    </app-filter-multi-select>

    <app-filter-range
      label="Temps de préparation"
      (valueChange)="onTimeChange($event)"
    >
    </app-filter-range>

    <app-filter-season label="Saison" (valueChange)="onSeasonsChange($event)">
    </app-filter-season>
  `,
  styles: ``,
})
export class FilterRecipe {
  // ✅ Signaux initialisés correctement
  searchText = signal("");
  ingredients = signal<string[]>(["Tomate", "Radis", "Pêche", "Concombre"]);
  seasons = signal<Season[]>(Object.keys(SEASONS) as Season[]);

  filtersChange = output<any>();
  filters = signal({
    name: "",
    time: { min: 0, max: 45 },
    include: [] as string[],
    exclude: [] as string[],
    seasons: [] as Season[],
    oven: false,
  });

  // ✅ Gestion des événements enfants
  onSearchChange(value: string) {
    this.filters.update((f) => ({ ...f, name: value }));
    this.updateFilters();
  }

  onOvenChange(value: boolean) {
    this.filters.update((f) => ({ ...f, oven: value }));
    this.updateFilters();
  }

  onIngredientsChange(value: string[]) {
    this.filters.update((f) => ({ ...f, include: value }));
    this.updateFilters();
  }

  onTimeChange(value: { min: number; max: number }) {
    this.filters.update((f) => ({ ...f, time: value }));
    this.updateFilters();
  }

  onSeasonsChange(value: Season[]) {
    this.filters.update((f) => ({ ...f, seasons: value }));
    this.updateFilters();
  }

  // ✅ Émission centralisée
  updateFilters() {
    this.filtersChange.emit(this.filters());
  }
}
