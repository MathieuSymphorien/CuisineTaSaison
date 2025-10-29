import { Component, input, output, signal } from "@angular/core";

@Component({
  selector: "app-filter-string",
  imports: [],
  template: `
    <label class="filter-label">
      {{ label() }}
      <input
        type="text"
        class="filter-input"
        [value]="value()"
        (input)="onChange($event)"
        placeholder="Saisir un texte..."
      />
    </label>
  `,
  styles: `
  .filter-label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 0.25rem;
}

.filter-input {
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
}

.filter-input:focus {
  border-color: #007bff;
}
  `,
})
export class FilterStringComponent {
  label = input<string>("Filtre texte");
  valueChange = output<string>();
  value = signal("");

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.valueChange.emit(this.value());
  }
}
