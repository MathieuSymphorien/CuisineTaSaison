import { Component, effect, input, output, signal } from "@angular/core";
import "src/app/shared/components/filter/filter-common.css";

@Component({
  selector: "app-filter-boolean",
  standalone: true,
  template: `
    <div class="filter-box">
      <label>
        <input
          type="checkbox"
          [checked]="internalValue()"
          (change)="toggle($event)"
        />
        {{ label() }}
      </label>
    </div>
  `,
})
export class FilterBooleanComponent {
  label = input<string>("Option");
  value = input<boolean>(false);
  valueChange = output<boolean>();

  internalValue = signal(false);

  constructor() {
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  toggle(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.internalValue.set(checked);
    this.valueChange.emit(checked);
  }
}
