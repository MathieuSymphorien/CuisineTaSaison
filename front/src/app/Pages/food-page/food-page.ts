import { FoodModel } from "src/app/Models/food.model";
import { Component, OnInit } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { FoodList } from "src/app/Core/food-list/food-list";
import { MockDataService } from "src/app/Services/mock-data";
import { ApiService } from "src/app/Services/api";
import { UploadComponent } from "src/app/Utils/upload-image/upload-image";

@Component({
  selector: "app-food-page",
  imports: [Header, FoodList, UploadComponent],
  standalone: true,
  template: `
    <app-header></app-header>
    <app-food-list [foods]="foods"></app-food-list>
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

  loadFoods(): void {
    this.apiService.getFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des foods:", err);
      },
    });
  }

  // constructor(private mockData: MockDataService) {}

  // ngOnInit() {
  //   this.foods = this.mockData.getFoods();
  // }
}
