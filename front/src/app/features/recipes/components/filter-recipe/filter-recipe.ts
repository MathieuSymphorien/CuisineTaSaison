import { Component, inject, OnInit, output, signal } from "@angular/core";
import { FilterStringComponent } from "src/app/shared/components/filter/filter-string/filter-string";
import { FilterBooleanComponent } from "src/app/shared/components/filter/filter-boolean/filter-boolean";
import { FilterMultiSelectComponent } from "src/app/shared/components/filter/filter-multi-select/filter-multi-select";
import { FilterRangeComponent } from "src/app/shared/components/filter/filter-range/filter-range";
import { FilterMonthComponent } from "src/app/shared/components/filter/filter-month/filter-month";
import { Month, MONTHS } from "src/app/shared/models/month.model";
import { FoodApiService } from "src/app/features/foods/services/food-api.service";
import { FoodModel } from "src/app/shared/models/food.model";

export interface RecipeFilterValues {
  name: string;
  time: { min: number; max: number };
  includeFoodIds: number[];
  excludeFoodIds: number[];
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
export class FilterRecipe implements OnInit {
  private readonly foodApiService = inject(FoodApiService);

  searchText = signal("");
  foods = signal<FoodModel[]>([]);
  ingredientNames = signal<string[]>([]);
  months = signal<Month[]>(Object.keys(MONTHS) as Month[]);

  filtersChange = output<RecipeFilterValues>();
  filters = signal<RecipeFilterValues>({
    name: "",
    time: { min: 0, max: 45 },
    includeFoodIds: [],
    excludeFoodIds: [],
    months: [],
    oven: false,
  });

  ngOnInit(): void {
    this.loadFoods();
  }

  private loadFoods(): void {
    this.foodApiService.getAllFoods().subscribe({
      next: (foods) => {
        this.foods.set(foods);
        this.ingredientNames.set(foods.map((f) => f.name));
      },
    });
  }

  private getFoodIdsByNames(names: string[]): number[] {
    return this.foods()
      .filter((f) => names.includes(f.name))
      .map((f) => f.id);
  }

  onSearchChange(value: string): void {
    this.filters.update((f) => ({ ...f, name: value }));
    this.updateFilters();
  }

  onOvenChange(value: boolean): void {
    this.filters.update((f) => ({ ...f, oven: value }));
    this.updateFilters();
  }

  onIncludeIngredientsChange(value: string[]): void {
    const foodIds = this.getFoodIdsByNames(value);
    this.filters.update((f) => ({ ...f, includeFoodIds: foodIds }));
    this.updateFilters();
  }

  onExcludeIngredientsChange(value: string[]): void {
    const foodIds = this.getFoodIdsByNames(value);
    this.filters.update((f) => ({ ...f, excludeFoodIds: foodIds }));
    this.updateFilters();
  }

  onPreparationTimeChange(value: { min: number; max: number }): void {
    this.filters.update((f) => ({ ...f, preparationTime: value }));
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
