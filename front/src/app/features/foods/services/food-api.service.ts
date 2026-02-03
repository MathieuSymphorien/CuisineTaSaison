import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  FoodCategory,
  FoodModel,
  CreateFoodDto,
} from "src/app/shared/models/food.model";
import { Month } from "src/app/shared/models/month.model";
import { BaseApiService } from "../../../core/services/base-api.service";

export interface FoodFilters {
  name?: string;
  category?: FoodCategory;
  months?: Month[];
}

@Injectable({
  providedIn: "root",
})
export class FoodApiService extends BaseApiService<FoodModel, CreateFoodDto> {
  protected readonly apiUrl = "/api/foods";

  constructor(http: HttpClient) {
    super(http);
  }

  getAllFoods(filters: FoodFilters = {}): Observable<FoodModel[]> {
    const params = this.buildParams({
      name: filters.name,
      category: filters.category,
      months: filters.months,
    });
    return this.getAll(params);
  }

  getSeasonalFoods(): Observable<FoodModel[]> {
    return this.http.get<FoodModel[]>(`${this.apiUrl}/seasonal`);
  }

  createFood(food: CreateFoodDto): Observable<FoodModel> {
    return this.create(food);
  }
}
