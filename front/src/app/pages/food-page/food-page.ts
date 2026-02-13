import { FoodModel } from "src/app/shared/models/food.model";
import { Component, inject, OnInit } from "@angular/core";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { FoodList } from "src/app/features/foods/components/food-list/food-list";
import { FoodApiService } from "src/app/features/foods/services/food-api.service";
import {
  FilterFood,
  FoodFilterValues,
} from "src/app/features/foods/components/filter-food/filter-food";
import { SeasonalityTable } from "src/app/features/foods/components/seasonality-table/seasonality-table";

@Component({
  selector: "app-food-page",
  imports: [Header, Footer, FoodList, FilterFood, SeasonalityTable],
  standalone: true,
  template: `
    <div class="food-page-general">
      <app-header></app-header>
      <div class="food-page">
        <div class="filters-container">
          <app-filter-food
            (filtersChange)="onFilterChange($event)"
          ></app-filter-food>
        </div>
        <div class="food-list-container">
          <app-food-list [foods]="foods"></app-food-list>
        </div>
      </div>
    </div>
    <app-seasonality-table [foods]="foods"></app-seasonality-table>

    <app-footer></app-footer>
  `,
  styleUrls: [`food-page.css`],
})
export class FoodPage implements OnInit {
  foods: FoodModel[] = [];

  private readonly foodApiService = inject(FoodApiService);

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(filters?: FoodFilterValues): void {
    this.foodApiService
      .getAllFoods({
        name: filters?.name || undefined,
        category: filters?.categories?.[0] || undefined,
        months: filters?.months?.length ? filters.months : undefined,
      })
      .subscribe({
        next: (foods) => {
          this.foods = foods;
        },
      });
  }

  onFilterChange(filters: FoodFilterValues): void {
    this.loadFoods(filters);
  }
}
