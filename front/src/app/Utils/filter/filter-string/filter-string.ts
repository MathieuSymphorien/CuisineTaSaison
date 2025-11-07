import { Component, input, output, signal } from "@angular/core";
import "src/app/Utils/filter/filter-common.css";

@Component({
  selector: "app-filter-string",
  standalone: true,
  template: `
    <div class="filter-box">
      <div class="header">{{ label() }}</div>
      <input
        type="text"
        [value]="value()"
        (input)="onChange($event)"
        placeholder="Saisir un texte..."
      />
    </div>
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
