import { Component, effect, input, output, signal } from "@angular/core";
import "src/app/Utils/filter/filter-common.css";

@Component({
  selector: "app-filter-number",
  standalone: true,
  template: `
    <div class="filter-box">
      <div class="header">{{ label() }}</div>
      <input
        type="number"
        [value]="internalValue()"
        (input)="onChange($event)"
        [min]="min()"
        [max]="max()"
        [placeholder]="placeholder()"
      />
    </div>
  `,
})
export class FilterNumberComponent {
  label = input<string>("Nombre");
  value = input<number>(0);
  min = input<number>(0);
  max = input<number | null>(null);
  placeholder = input<string>("");
  valueChange = output<number>();

  internalValue = signal(0);

  constructor() {
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const val = Number(target.value);
    this.internalValue.set(val);
    this.valueChange.emit(val);
  }
}
