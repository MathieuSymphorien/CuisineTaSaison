import { Component, input, output, signal } from "@angular/core";
import "src/app/Utils/filter/filter-common.css";

@Component({
  selector: "app-filter-boolean",
  standalone: true,
  template: `
    <div class="filter-box">
      <label>
        <input type="checkbox" [checked]="value()" (change)="toggle($event)" />
        {{ label() }}
      </label>
    </div>
  `,
})
export class FilterBooleanComponent {
  label = input<string>("Option");
  value = signal(false);
  valueChange = output<boolean>();

  toggle(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.value.set(checked);
    this.valueChange.emit(checked);
  }
}
