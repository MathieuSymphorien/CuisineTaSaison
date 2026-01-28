import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-upload-image",
  imports: [],
  template: `
    <div class="upload-container">
      <div class="upload-card">
        <h2>Ajouter une photo</h2>
        <p class="upload-description">
          Téléchargez une image pour votre produit ou recette
        </p>

        <form (submit)="onSubmit($event)" class="upload-form">
          <div class="file-input-wrapper">
            <input
              type="file"
              id="file-input"
              (change)="onFileSelected($event)"
              accept="image/*"
              class="file-input"
            />
            <label for="file-input" class="file-label">
              <span class="file-label-text">Choisir un fichier</span>
            </label>
          </div>

          <button
            type="submit"
            [disabled]="!selectedFile"
            class="upload-button"
            [class.disabled]="!selectedFile"
          >
            Uploader l'image 📸
          </button>
        </form>

        @if(previewUrl){
        <div class="preview-section">
          <h3>Prévisualisation</h3>
          <div class="preview-image-wrapper">
            <img [src]="previewUrl" alt="preview" />
          </div>
        </div>
        }@else {
        <div class="empty-preview">
          <p>Aucune image sélectionnée</p>
        </div>
        }
      </div>
    </div>
  `,
  styles: `
    .upload-container {
      max-width: 600px;
      margin: var(--spacing-xl) auto;
      padding: 0 var(--spacing-lg);
    }
    
    .upload-card {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-xl);
    }
    
    .upload-card h2 {
      color: var(--color-secondary);
      font-size: 24px;
      margin-bottom: var(--spacing-xs);
      font-weight: 600;
      text-align: center;
    }
    
    .upload-description {
      color: var(--color-text-light);
      text-align: center;
      margin-bottom: var(--spacing-xl);
      font-size: 15px;
    }
    
    .upload-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }
    
    .file-input-wrapper {
      position: relative;
    }
    
    .file-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .file-label {
      display: block;
      padding: var(--spacing-lg);
      border: 2px dashed var(--color-border);
      border-radius: var(--radius-md);
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-normal);
      background-color: var(--color-bg-primary);
    }
    
    .file-label:hover {
      border-color: var(--color-border-focus);
      background-color: rgba(124, 179, 66, 0.05);
    }
    
    .file-label-text {
      color: var(--color-secondary);
      font-weight: 500;
      font-size: 15px;
    }
    
    .upload-button {
      width: 100%;
      padding: 16px;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-normal);
    }
    
    .upload-button:hover:not(.disabled) {
      background-color: var(--color-primary-dark);
      transform: translateY(-2px);
    }
    
    .upload-button:active:not(.disabled) {
      transform: scale(0.98);
    }
    
    .upload-button.disabled {
      background-color: var(--color-text-light);
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    .preview-section {
      margin-top: var(--spacing-xl);
      padding-top: var(--spacing-xl);
      border-top: 1px solid var(--color-border-light);
    }
    
    .preview-section h3 {
      color: var(--color-secondary);
      font-size: 18px;
      margin-bottom: var(--spacing-md);
      font-weight: 600;
      text-align: center;
    }
    
    .preview-image-wrapper {
      display: flex;
      justify-content: center;
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 2px solid var(--color-border-light);
    }
    
    .preview-image-wrapper img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    .empty-preview {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--color-text-light);
      font-style: italic;
    }
  `,
})
export class UploadComponent {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Affiche une prévisualisation locale
      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append("file", this.selectedFile);
    console.log("Envoi du fichier:", this.selectedFile);
    console.log("FormData:", formData);
    this.http.post("/api/upload", formData).subscribe({
      next: (res) => console.log("Upload réussi", res),
      error: (err) => console.error("Erreur upload", err),
    });
  }
}
