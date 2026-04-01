import { Component, input, output } from "@angular/core";
import { Recipe } from "../recipe/recipe";
import { RecipeModel } from "src/app/shared/models/recipe.model";

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [Recipe],
  template: `
    <div class="recipe-list">
      @for (recipe of recipes(); track recipe.id) {
        <app-recipe
          [recipe]="recipe"
          (recipeChanged)="onRecipeChanged($event)"
        ></app-recipe>
      }
    </div>
  `,
  styles: `
    .recipe-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-lg);
      padding: var(--spacing-md);
    }

    @media (max-width: 480px) {
      .recipe-list {
        grid-template-columns: 1fr;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
      }
    }
  `,
})
export class RecipeList {
  recipes = input<RecipeModel[]>();
  recipesChanged = output<number>();

  onRecipeChanged(recipeId: number) {
    this.recipesChanged.emit(recipeId);
  }
}
