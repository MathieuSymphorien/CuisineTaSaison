import { Component, input, output, signal, computed } from "@angular/core";
import { FilterStringComponent } from "../filter-string/filter-string";

@Component({
  selector: "app-filter-multi-select",
  standalone: true,
  template: `<div class="filter-box">
    <div class="header">
      <span>{{ label() }}</span>
      <app-filter-string label="Recherche" (valueChange)="search.set($event)">
      </app-filter-string>
    </div>

    <div class="options">
      @for(opt of options(); track opt){
      <label>
        <input
          type="checkbox"
          [checked]="selected().has(opt)"
          (change)="toggleOption(opt)"
        />
        {{ opt }}
      </label>
      }
    </div>
  </div> `,
  styles: `
    .filter-box {
      border: 1px solid #ccc;
      padding: 8px;
    }
  `,
  imports: [FilterStringComponent],
})
export class FilterMultiSelectComponent {
  label = input<string>("Ingrédients");
  options = input<string[]>([]);
  selected = signal<Set<string>>(new Set());
  search = signal("");
  valueChange = output<string[]>();

  filteredOptions = computed(() =>
    this.options().filter((opt) =>
      opt.toLowerCase().includes(this.search().toLowerCase())
    )
  );

  toggleOption(option: string) {
    const set = new Set(this.selected());
    set.has(option) ? set.delete(option) : set.add(option);
    this.selected.set(set);
    this.valueChange.emit(Array.from(this.selected()));
  }
}
