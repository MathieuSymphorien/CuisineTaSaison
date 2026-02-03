import { Component, effect, input, output, signal } from "@angular/core";
import "src/app/shared/components/filter/filter-common.css";

@Component({
  selector: "app-filter-select",
  standalone: true,
  template: `
    <div class="filter-box">
      <div class="header">
        <span>{{ label() }}</span>
      </div>

      <div class="options">
        @for (opt of options(); track opt) {
          <label>
            <input
              type="radio"
              [name]="label()"
              [checked]="internalSelected() === opt"
              (change)="selectOption(opt)"
            />
            {{ opt }}
          </label>
        }
      </div>
    </div>
  `,
})
export class FilterSelectComponent {
  label = input<string>("Sélection");
  options = input<string[]>([]);
  value = input<string | null>(null);
  internalSelected = signal<string | null>(null);
  valueChange = output<string | null>();

  constructor() {
    effect(() => {
      this.internalSelected.set(this.value());
    });
  }

  selectOption(option: string) {
    this.internalSelected.set(option);
    this.valueChange.emit(option);
  }
}
