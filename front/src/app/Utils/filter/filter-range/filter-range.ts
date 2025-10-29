import { Component, input, output, signal } from "@angular/core";

@Component({
  selector: "app-filter-range",
  standalone: true,
  template: `
    <div class="filter-range">
      <label>{{ label() }}</label>
      <div class="range-inputs">
        <input
          type="number"
          [value]="min()"
          (input)="onMinChange($event)"
          min="0"
        />
        mn —
        <input
          type="number"
          [value]="max()"
          (input)="onMaxChange($event)"
          min="0"
        />
        mn
      </div>
      <input
        type="range"
        min="0"
        max="180"
        [value]="max()"
        (input)="onMaxChange($event)"
      />
    </div>
  `,
})
export class FilterRangeComponent {
  label = input<string>("Durée");
  min = signal(0);
  max = signal(60);
  valueChange = output<{ min: number; max: number }>();

  onMinChange(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.min.set(val);
    this.valueChange.emit({ min: this.min(), max: this.max() });
  }

  onMaxChange(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.max.set(val);
    this.valueChange.emit({ min: this.min(), max: this.max() });
  }
}
