import { Component, inject, input, output } from "@angular/core";
import { RecipeModel } from "src/app/Models/recipe.model";
import { AdminService } from "src/app/Services/admin.service";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-recipe",
  imports: [],
  templateUrl: "./recipe.html",
  styleUrls: ["./recipe.css"],
})
export class Recipe {
  private readonly adminService = inject(AdminService);
  private readonly authService = inject(AuthService);

  recipe = input<RecipeModel>();
  recipeChanged = output<number>();
  compact = input(false);

  readonly isAdmin = this.authService.isAdmin;

  rejectRecipe(recipe: RecipeModel | undefined): void {
    if (!recipe?.id) return;
    this.adminService.rejectRecipe(recipe.id).subscribe({
      next: () => this.recipeChanged.emit(recipe.id),
    });
  }

  approveRecipe(recipe: RecipeModel | undefined): void {
    if (!recipe?.id) return;
    this.adminService.approveRecipe(recipe.id).subscribe({
      next: () => this.recipeChanged.emit(recipe.id),
    });
  }
}
