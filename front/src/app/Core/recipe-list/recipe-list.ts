import { Component, input } from "@angular/core";
import { Recipe } from "../recipe/recipe";
import { RecipeModel } from "src/app/Models/recipe.model";

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [Recipe],
  template: `
    <div class="recipe-list">
      @for (recipe of recipes(); track recipe.id) {
      <app-recipe [recipe]="recipe"></app-recipe>
      }
    </div>
  `,
  styles: `
    .recipe-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--spacing-lg);
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-md);
    }
  `,
})
export class RecipeList {
  recipes = input<RecipeModel[]>();
}
