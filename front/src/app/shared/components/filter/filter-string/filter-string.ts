import { Component, effect, input, output, signal } from "@angular/core";
import "src/app/shared/components/filter/filter-common.css";

@Component({
  selector: "app-filter-string",
  standalone: true,
  template: `
    <div class="filter-box">
      <div class="header">{{ label() }}</div>
      <input
        type="text"
        [value]="internalValue()"
        (input)="onChange($event)"
        placeholder="Saisir un texte..."
      />
    </div>
  `,
})
export class FilterStringComponent {
  label = input<string>("Filtre texte");
  value = input<string>("");
  valueChange = output<string>();

  internalValue = signal("");

  constructor() {
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.internalValue.set(target.value);
    this.valueChange.emit(this.internalValue());
  }
}
