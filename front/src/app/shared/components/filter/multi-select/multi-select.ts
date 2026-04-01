import { Component, input, output } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";

export interface SelectOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: "app-multi-select",
  imports: [MatSelectModule],
  standalone: true,
  template: `
    <mat-form-field style="width: 100%">
      <mat-label>{{ label() }}</mat-label>
      <mat-select
        [value]="value()"
        multiple
        (selectionChange)="valueChange.emit($event.value)"
      >
        @for (option of options(); track option.value) {
          <mat-option [value]="option.value">{{ option.label }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class MultiSelectComponent<T> {
  label = input<string>("");
  options = input<SelectOption<T>[]>([]);
  value = input<T[]>([]);
  valueChange = output<T[]>();
}
