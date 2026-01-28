import { input } from "@angular/core";
import { Component, output } from "@angular/core";
import { FoodModel } from "src/app/Models/food.model";

@Component({
  selector: "app-recipe-proposal",
  imports: [],
  template: `
    <div class="proposal-form">
      <div class="form-group">
        <label for="recipe-name">Nom de la recette</label>
        <input 
          id="recipe-name" 
          type="text" 
          placeholder="Ex: Tarte aux pommes..."
        />
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          placeholder="Décrivez votre recette..."
          rows="4"
        ></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="time">Temps de préparation (minutes)</label>
          <input id="time" type="number" min="1" placeholder="30" />
        </div>
        
        <div class="form-group">
          <label for="people">Nombre de personnes</label>
          <input id="people" type="number" min="1" placeholder="4" />
        </div>
      </div>
      
      <div class="form-group checkbox-group">
        <label>
          <input type="checkbox" />
          <span>Utilisation du four</span>
        </label>
      </div>
      
      <div class="form-group">
        <label for="steps">Étapes de la recette</label>
        <textarea 
          id="steps" 
          placeholder="Étape 1: ...&#10;Étape 2: ..."
          rows="6"
        ></textarea>
        <p class="form-hint">Séparez chaque étape par un retour à la ligne</p>
      </div>
      
      <div class="form-group">
        <label for="ingredients">Ingrédients</label>
        <input 
          id="ingredients" 
          type="text" 
          placeholder="Ex: Pommes, Farine, Sucre..."
        />
        <p class="form-hint">Séparez les ingrédients par des virgules</p>
      </div>
      
      <div class="form-group">
        <label for="season-ratio">Ratio de saisonnalité (optionnel)</label>
        <input 
          id="season-ratio" 
          type="number" 
          step="0.1" 
          min="0" 
          max="100"
          placeholder="0-100"
        />
        <p class="form-hint">Pourcentage d'ingrédients de saison dans la recette</p>
      </div>
      
      <button class="submit-button" (click)="submitProposal()">
        Proposer cette recette 🍳
      </button>
    </div>
  `,
  styles: `
    .proposal-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-lg);
    }
    
    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
    
    .form-group label {
      color: var(--color-secondary);
      font-weight: 600;
      font-size: 15px;
    }
    
    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      cursor: pointer;
      flex-direction: row;
    }
    
    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
      accent-color: var(--color-primary);
      cursor: pointer;
    }
    
    .form-group input,
    .form-group textarea {
      padding: 14px 18px;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 16px;
      transition: border-color var(--transition-normal);
      background-color: var(--color-bg-secondary);
      color: var(--color-text);
      font-family: "Poppins", sans-serif;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--color-border-focus);
    }
    
    .form-group textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    .form-hint {
      font-size: 13px;
      color: var(--color-text-light);
      margin-top: var(--spacing-xs);
      font-style: italic;
    }
    
    .submit-button {
      width: 100%;
      padding: 16px;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color var(--transition-normal), transform var(--transition-fast);
      margin-top: var(--spacing-md);
    }
    
    .submit-button:hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-2px);
    }
    
    .submit-button:active {
      transform: scale(0.98);
    }
  `,
})
export class RecipeProposal {
  name = output<string>();
  description = output<string>();
  time = output<number>();
  oven = output<boolean>();
  people = output<number>();
  steps = output<string[]>();
  foods = output<FoodModel[]>();
  seasonRatio = output<number>();
  submitProposal() {
    // Logique pour soumettre la proposition de recette
  }
}
