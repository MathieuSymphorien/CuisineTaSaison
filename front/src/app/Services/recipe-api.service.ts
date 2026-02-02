import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateRecipeDto, RecipeModel } from "../Models/recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeApiService {
  private apiUrl = "/api/recipes"; // Proxy vers le backend (configuré dans nginx.conf)

  constructor(private http: HttpClient) {}

  // Récupère toutes les recettes
  getAllRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(this.apiUrl);
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
