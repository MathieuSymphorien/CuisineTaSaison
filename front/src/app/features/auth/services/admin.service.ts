import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap, catchError, throwError } from "rxjs";
import { FoodModel } from "src/app/shared/models/food.model";
import { RecipeModel } from "src/app/shared/models/recipe.model";
import { NotificationService } from "../../../core/services/notification.service";

export type EntityType = "food" | "recipe";

@Injectable({ providedIn: "root" })
export class AdminService {
  private readonly apiUrl = "/api/admin";
  private readonly http = inject(HttpClient);
  private readonly notificationService = inject(NotificationService);

  // Food methods
  getPendingFoods(): Observable<FoodModel[]> {
    return this.http.get<FoodModel[]>(`${this.apiUrl}/foods/pending`);
  }

  approveFood(id: number): Observable<FoodModel> {
    return this.approve<FoodModel>("food", id);
  }

  rejectFood(id: number): Observable<void> {
    return this.reject("food", id);
  }

  // Recipe methods
  getPendingRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.apiUrl}/recipes/pending`);
  }

  approveRecipe(id: number): Observable<RecipeModel> {
    return this.approve<RecipeModel>("recipe", id);
  }

  rejectRecipe(id: number): Observable<void> {
    return this.reject("recipe", id);
  }

  // Méthodes génériques centralisées
  private approve<T>(entityType: EntityType, id: number): Observable<T> {
    const endpoint = entityType === "food" ? "foods" : "recipes";
    const entityLabel = entityType === "food" ? "L'aliment" : "La recette";

    return this.http
      .put<T>(`${this.apiUrl}/${endpoint}/${id}/approve`, {})
      .pipe(
        tap(() =>
          this.notificationService.success(`${entityLabel} a été approuvé(e)`),
        ),
        catchError((error) => {
          this.notificationService.error(`Erreur lors de l'approbation`);
          return throwError(() => error);
        }),
      );
  }

  private reject(entityType: EntityType, id: number): Observable<void> {
    const endpoint = entityType === "food" ? "foods" : "recipes";
    const entityLabel = entityType === "food" ? "L'aliment" : "La recette";

    return this.http
      .delete<void>(`${this.apiUrl}/${endpoint}/${id}/reject`)
      .pipe(
        tap(() =>
          this.notificationService.success(`${entityLabel} a été refusé(e)`),
        ),
        catchError((error) => {
          this.notificationService.error(`Erreur lors du refus`);
          return throwError(() => error);
        }),
      );
  }
}
