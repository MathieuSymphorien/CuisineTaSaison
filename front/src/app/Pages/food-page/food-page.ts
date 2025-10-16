import { FoodModel } from "src/app/Models/food.model";
import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";
import { FoodList } from "src/app/Core/food-list/food-list";
import { MockDataService } from "src/app/Services/mock-data";

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
export class FoodPage {
  foods: FoodModel[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.foods = this.mockData.getFoods();
  }
}
