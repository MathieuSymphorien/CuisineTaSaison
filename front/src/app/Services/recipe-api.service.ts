import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateRecipeDto, RecipeModel } from "../Models/recipe.model";
import { Month } from "../Models/month.model";

@Injectable({
  providedIn: "root",
})
export class RecipeApiService {
  private apiUrl = "/api/recipes"; // Proxy vers le backend (configuré dans nginx.conf)

  constructor(private http: HttpClient) {}

  // Récupère toutes les recettes avec filtres optionnels
  getAllRecipes(
    name?: string,
    timeMin?: number,
    timeMax?: number,
    oven?: boolean,
    months?: Month[],
  ): Observable<RecipeModel[]> {
    let params = new HttpParams();

    if (name) {
      params = params.set("name", name);
    }
    if (timeMin !== undefined && timeMin > 0) {
      params = params.set("timeMin", timeMin.toString());
    }
    if (timeMax !== undefined && timeMax > 0) {
      params = params.set("timeMax", timeMax.toString());
    }
    if (oven !== undefined && oven) {
      params = params.set("oven", "true");
    }
    if (months && months.length > 0) {
      months.forEach((m) => {
        params = params.append("months", m);
      });
    }

    return this.http.get<RecipeModel[]>(this.apiUrl, { params });
  }

  // Récupère une recette par ID
  getRecipeById(id: number): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${this.apiUrl}/${id}`);
  }

  // Crée une nouvelle recette
  createRecipe(recipe: CreateRecipeDto): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(this.apiUrl, recipe);
  }

  // Met à jour une recette
  updateRecipe(
    id: number,
    recipe: Partial<RecipeModel>,
  ): Observable<RecipeModel> {
    return this.http.put<RecipeModel>(`${this.apiUrl}/${id}`, recipe);
  }

  // Supprime une recette
  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Upload une image pour une recette
  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<string>(`${this.apiUrl}/upload`, formData);
  }
}
