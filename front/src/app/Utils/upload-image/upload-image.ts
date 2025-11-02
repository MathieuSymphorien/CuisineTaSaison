import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-upload-image",
  imports: [],
  template: `
    <div class="upload-container">
      <h2>Ajouter une photo</h2>

      <form (submit)="onSubmit($event)">
        <input type="file" (change)="onFileSelected($event)" accept="image/*" />
        <button type="submit" [disabled]="!selectedFile">Uploader</button>
      </form>

      @if(previewUrl){
      <div class="preview-section">
        <h3>Prévisualisation :</h3>
        <img [src]="previewUrl" alt="preview" width="200" />
      </div>
      }@else {
      <p>pas de photo le saaaannggg</p>
      }
    </div>
  `,
  styles: ``,
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
