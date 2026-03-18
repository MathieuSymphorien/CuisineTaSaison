import {
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { FilterStringComponent } from "src/app/shared/components/filter/filter-string/filter-string";
import { FilterBooleanComponent } from "src/app/shared/components/filter/filter-boolean/filter-boolean";
import {
  MultiSelectComponent,
  SelectOption,
} from "src/app/shared/components/filter/multi-select/multi-select";
import { FilterRangeComponent } from "src/app/shared/components/filter/filter-range/filter-range";
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
    MultiSelectComponent,
    FilterRangeComponent,
  ],
  templateUrl: "./filter-recipe.html",
  styleUrls: ["./filter-recipe.css"],
})
export class FilterRecipe implements OnInit {
  private readonly foodApiService = inject(FoodApiService);

  foods = signal<FoodModel[]>([]);

  foodOptions = computed<SelectOption<number>[]>(() =>
    this.foods().map((f) => ({ label: f.name, value: f.id })),
  );

  monthOptions: SelectOption<Month>[] = MONTHS.map((m) => ({
    label: m,
    value: m,
  }));

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
      next: (foods) => this.foods.set(foods),
    });
  }

  onSearchChange(value: string): void {
    this.filters.update((f) => ({ ...f, name: value }));
    this.updateFilters();
  }

  onOvenChange(value: boolean): void {
    this.filters.update((f) => ({ ...f, oven: value }));
    this.updateFilters();
  }

  onIncludeFoodsChange(value: number[]): void {
    this.filters.update((f) => ({ ...f, includeFoodIds: value }));
    this.updateFilters();
  }

  onExludeFoodsChange(value: number[]): void {
    this.filters.update((f) => ({ ...f, excludeFoodIds: value }));
    this.updateFilters();
  }

  onPreparationTimeChange(value: { min: number; max: number }): void {
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
