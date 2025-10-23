import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FoodModel } from "src/app/Models/food.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "/api/foods"; // Proxy vers le backend (configuré dans nginx.conf)

  constructor(private http: HttpClient) {}

  // Récupère tous les foods
  getFoods(): Observable<FoodModel[]> {
    return this.http.get<FoodModel[]>(this.apiUrl);
  }

  // Récupère un food par ID
  getFoodById(id: number): Observable<FoodModel> {
    return this.http.get<FoodModel>(`${this.apiUrl}/${id}`);
  }

  // Crée un nouveau food
  createFood(food: Omit<FoodModel, "id">): Observable<FoodModel> {
    return this.http.post<FoodModel>(this.apiUrl, food);
  }

  // Met à jour un food
  updateFood(id: number, food: Partial<FoodModel>): Observable<FoodModel> {
    return this.http.put<FoodModel>(`${this.apiUrl}/${id}`, food);
  }

  // Supprime un food
  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
