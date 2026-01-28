import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { FoodCategory, FoodModel } from "src/app/Models/food.model";
import { Month } from "../Models/month.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "/api/foods"; // Proxy vers le backend (configuré dans nginx.conf)

  constructor(private http: HttpClient) {}

  // Récupère tous les foods
  getAllFoods(
    name?: string,
    category?: FoodCategory,
    months?: Month[],
  ): Observable<FoodModel[]> {
    let params = new HttpParams();

    if (name) {
      params = params.set("name", name);
    }

    if (category) {
      params = params.set("category", category);
    }

    if (months && months.length > 0) {
      months.forEach((m) => {
        params = params.append("months", m);
      });
    }

    return this.http.get<FoodModel[]>(this.apiUrl, { params });
  }

  getSeasonalFoods(): Observable<FoodModel[]> {
    return this.http.get<FoodModel[]>(`${this.apiUrl}/seasonal`);
  }

  getFoodById(id: number): Observable<FoodModel> {
    return this.http.get<FoodModel>(`${this.apiUrl}/${id}`);
  }

  createFood(food: Omit<FoodModel, "id">): Observable<FoodModel> {
    return this.http.post<FoodModel>(this.apiUrl, food);
  }

  updateFood(id: number, food: Partial<FoodModel>): Observable<FoodModel> {
    return this.http.put<FoodModel>(`${this.apiUrl}/${id}`, food);
  }

  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
