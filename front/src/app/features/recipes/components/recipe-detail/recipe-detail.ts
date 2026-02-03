import { Component, inject, signal, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { RecipeModel } from "src/app/shared/models/recipe.model";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { RecipeApiService } from "src/app/features/recipes/services/recipe-api.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-recipe-detail",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./recipe-detail.html",
  styleUrls: ["./recipe-detail.css"],
})
export class RecipeDetail implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<RecipeDetail>);
  private readonly data = inject<{ recipe: RecipeModel }>(MAT_DIALOG_DATA);
  private readonly authService = inject(AuthService);
  private readonly recipeApiService = inject(RecipeApiService);
  private readonly notificationService = inject(NotificationService);

  readonly isAdmin = this.authService.isAdmin;
  isEditing = signal(false);
  isSaving = signal(false);

  name = signal("");
  description = signal("");
  time = signal(0);
  oven = signal(false);
  people = signal(0);
  stepsText = signal("");
  recipe = signal<RecipeModel | null>(null);

  ngOnInit() {
    const r = this.data.recipe;
    this.recipe.set(r);
    this.name.set(r.name);
    this.description.set(r.description);
    this.time.set(r.time);
    this.oven.set(r.oven);
    this.people.set(r.people);
    this.stepsText.set(r.steps.join("\n"));
  }

  close() {
    this.dialogRef.close();
  }

  toggleEdit() {
    if (this.isEditing()) {
      this.resetForm();
    }
    this.isEditing.set(!this.isEditing());
  }

  private resetForm() {
    const r = this.data.recipe;
    this.name.set(r.name);
    this.description.set(r.description);
    this.time.set(r.time);
    this.oven.set(r.oven);
    this.people.set(r.people);
    this.stepsText.set(r.steps.join("\n"));
  }

  private getStepsArray(): string[] {
    return this.stepsText()
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  save() {
    this.isSaving.set(true);

    const updatedRecipe = {
      name: this.name(),
      description: this.description(),
      time: this.time(),
      oven: this.oven(),
      people: this.people(),
      steps: this.getStepsArray(),
    };

    this.recipeApiService.update(this.data.recipe.id, updatedRecipe).subscribe({
      next: (recipe) => {
        this.notificationService.success("Recette mise à jour avec succès");
        this.isSaving.set(false);
        this.isEditing.set(false);
        this.dialogRef.close(recipe);
      },
      error: () => {
        this.notificationService.error("Erreur lors de la mise à jour");
        this.isSaving.set(false);
      },
    });
  }
}
