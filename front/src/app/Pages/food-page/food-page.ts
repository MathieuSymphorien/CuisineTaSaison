import { FoodModel } from "src/app/Models/food.model";
import { Component, OnInit } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { FoodList } from "src/app/Core/food-list/food-list";
import { MockDataService } from "src/app/Services/mock-data";
import { ApiService } from "src/app/Services/api";

@Component({
  selector: "app-food-page",
  imports: [Header, FoodList],
  standalone: true,
  template: `
    <app-header></app-header>
    <p>food-page works!</p>
    <app-food-list [foods]="foods"></app-food-list>
  `,
  styles: ``,
})
export class FoodPage implements OnInit {
  foods: FoodModel[] = [];

  // constructor(private apiService: ApiService) {}

  // ngOnInit(): void {
  //   this.loadFoods();
  // }

  // loadFoods(): void {
  //   this.apiService.getFoods().subscribe({
  //     next: (foods) => {
  //       this.foods = foods;
  //     },
  //     error: (err) => {
  //       console.error("Erreur lors de la récupération des foods:", err);
  //     },
  //   });
  // }

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.foods = this.mockData.getFoods();
  }
}
