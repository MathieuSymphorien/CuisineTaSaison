import { Month } from "./../../Models/month.model";
import { Component, output } from "@angular/core";
import { FoodCategory } from "src/app/Models/food.model";

@Component({
  selector: "app-food-proposal",
  imports: [],
  template: `
    <div class="proposal-form">
      <div class="form-group">
        <label for="name">Nom de l'ingrédient</label>
        <input 
          id="name" 
          type="text" 
          placeholder="Ex: Pomme, Carotte..."
          (input)="name.emit($event.target.value)" 
        />
      </div>
      
      <div class="form-group">
        <label for="category">Catégorie</label>
        <select id="category">
          <option value="">Sélectionnez une catégorie</option>
          <option value="fruit">Fruit</option>
          <option value="legume">Légume</option>
          <option value="viande">Viande</option>
          <option value="poisson">Poisson</option>
          <option value="cereale">Céréale</option>
          <option value="epice">Épice</option>
          <option value="lacte">Produit laitier</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="months">Mois de disponibilité</label>
        <select id="months" multiple>
          <option value="january">Janvier</option>
          <option value="february">Février</option>
          <option value="march">Mars</option>
          <option value="april">Avril</option>
          <option value="may">Mai</option>
          <option value="june">Juin</option>
          <option value="july">Juillet</option>
          <option value="august">Août</option>
          <option value="september">Septembre</option>
          <option value="october">Octobre</option>
          <option value="november">Novembre</option>
          <option value="december">Décembre</option>
        </select>
        <p class="form-hint">Maintenez Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs mois</p>
      </div>
      
      <button class="submit-button" (click)="submitProposal()">
        Proposer cet ingrédient 🍎
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
    
    .form-group label {
      color: var(--color-secondary);
      font-weight: 600;
      font-size: 15px;
    }
    
    .form-group input,
    .form-group select {
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
    .form-group select:focus {
      outline: none;
      border-color: var(--color-border-focus);
    }
    
    .form-group select[multiple] {
      min-height: 150px;
      padding: var(--spacing-sm);
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
export class FoodProposal {
  name = output<string>();
  category = output<FoodCategory>();
  months = output<Month[]>();

  submitProposal() {
    // Logique pour soumettre la proposition d'ingrédient
  }
}
