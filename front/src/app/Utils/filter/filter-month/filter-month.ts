import { Component, input, output, signal } from "@angular/core";
import { Month, MONTHS } from "src/app/Models/month.model";
import "src/app/Utils/filter/filter-common.css";

@Component({
  selector: "app-filter-month",
  standalone: true,
  template: `
    <div class="filter-box">
      <div class="header">{{ label() }}</div>
      @for (opt of months; track opt) {
      <label>
        <input
          type="checkbox"
          [checked]="selected().has(opt)"
          (change)="toggleMonth(opt)"
        />
        {{ opt }}
      </label>
      }
    </div>
  `,
})
export class FilterMonthComponent {
  label = input<string>("Mois");
  months: Month[] = MONTHS;
  selected = signal<Set<Month>>(new Set());
  valueChange = output<Month[]>();

  toggleMonth(month: Month) {
    const s = new Set(this.selected());
    s.has(month) ? s.delete(month) : s.add(month);
    this.selected.set(s);
    this.valueChange.emit(Array.from(s));
  }
}
