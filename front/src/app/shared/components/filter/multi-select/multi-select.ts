import { Component, input, output } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

export interface SelectOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: "app-multi-select",
  imports: [MatSelectModule, ReactiveFormsModule],
  standalone: true,
  template: `
    <mat-form-field>
      <mat-label>{{ label() }}</mat-label>
      <mat-select
        [formControl]="control"
        multiple
        (selectionChange)="valueChange.emit(control.value)"
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
  valueChange = output<T[]>();

  control = new FormControl<T[]>([] as T[], { nonNullable: true });
}
