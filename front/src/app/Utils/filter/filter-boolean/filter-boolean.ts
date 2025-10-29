import { Component, input, output, signal } from "@angular/core";

@Component({
  selector: "app-filter-boolean",
  standalone: true,
  template: `<label>
    <input type="checkbox" [checked]="value()" (change)="toggle($event)" />
    {{ label() }}
  </label> `,
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
