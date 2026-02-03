import { Component, inject, input, output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RecipeModel } from "src/app/shared/models/recipe.model";
import { AdminService } from "src/app/features/auth/services/admin.service";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { RecipeDetail } from "../recipe-detail/recipe-detail";

@Component({
  selector: "app-recipe",
  imports: [],
  templateUrl: "./recipe.html",
  styleUrls: ["./recipe.css"],
})
export class Recipe {
  private readonly adminService = inject(AdminService);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  recipe = input<RecipeModel>();
  recipeChanged = output<number>();
  compact = input(false);

  readonly isAdmin = this.authService.isAdmin;

  openDetail() {
    const recipe = this.recipe();
    if (!recipe) return;

    const dialogRef = this.dialog.open(RecipeDetail, {
      data: { recipe },
      panelClass: "transparent-dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recipeChanged.emit(result.id);
      }
    });
  }

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
