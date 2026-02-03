import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateRecipeDto, RecipeModel } from "../Models/recipe.model";
import { Month } from "../Models/month.model";
import { BaseApiService } from "./base-api.service";

export interface RecipeFilters {
  name?: string;
  timeMin?: number;
  timeMax?: number;
  oven?: boolean;
  months?: Month[];
  includeFoodIds?: number[];
  excludeFoodIds?: number[];
}

@Injectable({
  providedIn: "root",
})
export class RecipeApiService extends BaseApiService<RecipeModel, CreateRecipeDto> {
  protected readonly apiUrl = "/api/recipes";

  constructor(http: HttpClient) {
    super(http);
  }

  getAllRecipes(filters: RecipeFilters = {}): Observable<RecipeModel[]> {
    const params = this.buildParams({
      name: filters.name,
      timeMin: filters.timeMin,
      timeMax: filters.timeMax,
      oven: filters.oven,
      months: filters.months,
      includeFoodIds: filters.includeFoodIds,
      excludeFoodIds: filters.excludeFoodIds,
    });
    return this.getAll(params);
  }

  createRecipe(recipe: CreateRecipeDto): Observable<RecipeModel> {
    return this.create(recipe);
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<string>(`${this.apiUrl}/upload`, formData);
  }
}
