import { Component, effect, input, output, signal } from "@angular/core";
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
          [checked]="internalSelected().has(opt)"
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
  value = input<Month[]>([]);
  months: Month[] = MONTHS;
  internalSelected = signal<Set<Month>>(new Set());
  valueChange = output<Month[]>();

  constructor() {
    effect(() => {
      this.internalSelected.set(new Set(this.value()));
    });
  }

  toggleMonth(month: Month) {
    const s = new Set(this.internalSelected());
    s.has(month) ? s.delete(month) : s.add(month);
    this.internalSelected.set(s);
    this.valueChange.emit(Array.from(s));
  }
}
