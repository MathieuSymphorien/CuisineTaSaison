import {
  Component,
  effect,
  input,
  output,
  signal,
  computed,
} from "@angular/core";
import "src/app/shared/components/filter/filter-common.css";

@Component({
  selector: "app-filter-multi-select",
  standalone: true,
  template: `<div class="filter-box">
    <div class="header">
      <span>{{ label() }}</span>
    </div>

    <div class="options">
      @for (opt of options(); track opt) {
        <label>
          <input
            type="checkbox"
            [checked]="internalSelected().has(opt)"
            (change)="toggleOption(opt)"
          />
          {{ opt }}
        </label>
      }
    </div>
  </div> `,
})
export class FilterMultiSelectComponent {
  label = input<string>("Ingrédients");
  options = input<string[]>([]);
  value = input<string[]>([]);
  internalSelected = signal<Set<string>>(new Set());
  search = signal("");
  valueChange = output<string[]>();

  constructor() {
    effect(() => {
      this.internalSelected.set(new Set(this.value()));
    });
  }

  filteredOptions = computed(() =>
    this.options().filter((opt) =>
      opt.toLowerCase().includes(this.search().toLowerCase()),
    ),
  );

  toggleOption(option: string) {
    const set = new Set(this.internalSelected());
    set.has(option) ? set.delete(option) : set.add(option);
    this.internalSelected.set(set);
    this.valueChange.emit(Array.from(this.internalSelected()));
  }
}
