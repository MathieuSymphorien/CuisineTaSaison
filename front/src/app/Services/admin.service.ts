import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FoodModel } from "../Models/food.model";
import { RecipeModel } from "../Models/recipe.model";

@Injectable({ providedIn: "root" })
export class AdminService {
  private readonly apiUrl = "/api/admin";

  constructor(private http: HttpClient) {}

  //food

  getpendingFoods(): Observable<FoodModel[]> {
    return this.http.get<FoodModel[]>(`${this.apiUrl}/foods/pending`);
  }

  approveFood(id: number): Observable<FoodModel> {
    return this.http.put<FoodModel>(`${this.apiUrl}/foods/${id}/approve`, {});
  }

  rejectFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/foods/${id}/reject`);
  }

  //recipe

  getPendingRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.apiUrl}/recipes/pending`);
  }

  approveRecipe(id: number): Observable<RecipeModel> {
    return this.http.put<RecipeModel>(
      `${this.apiUrl}/recipes/${id}/approve`,
      {},
    );
  }

  rejectRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes/${id}/reject`);
  }
}
