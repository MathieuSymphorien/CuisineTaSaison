import { FoodModel } from "src/app/Models/food.model";
import { Component, OnInit } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { FoodList } from "src/app/Core/food-list/food-list";
import { MockDataService } from "src/app/Services/mock-data";
import { ApiService } from "src/app/Services/api";
import { UploadComponent } from "src/app/Utils/upload-image/upload-image";
import { FilterFood } from "src/app/Core/filter-food/filter-food";

@Component({
  selector: "app-food-page",
  imports: [Header, FoodList, UploadComponent, FilterFood],
  standalone: true,
  template: `
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

    <app-upload-image></app-upload-image>
  `,
  styleUrls: [`food-page.css`],
})
export class FoodPage implements OnInit {
  foods: FoodModel[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(filters?: any): void {
    const name = filters?.name ?? null;
    const category = filters?.categories?.[0] ?? null; // si tu n’en veux qu’une
    const months = filters?.months ?? [];
    this.apiService.getAllFoods(name, category, months).subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des foods:", err);
      },
    });
  }

  onFilterChange(filters: any): void {
    this.loadFoods(filters);
  }

  // constructor(private mockData: MockDataService) {}
  // ngOnInit() {
  //   this.foods = this.mockData.getFoods();
  // }
}
