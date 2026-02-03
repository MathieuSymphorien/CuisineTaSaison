import { Component, effect, input, output, signal } from "@angular/core";
import "src/app/shared/components/filter/filter-common.css";

@Component({
  selector: "app-filter-textarea",
  standalone: true,
  template: `
    <div class="filter-box">
      <div class="header">{{ label() }}</div>
      <textarea
        [value]="internalValue()"
        (input)="onChange($event)"
        [placeholder]="placeholder()"
        [rows]="rows()"
      ></textarea>
      @if (hint()) {
        <p class="hint">{{ hint() }}</p>
      }
    </div>
  `,
  styles: `
    textarea {
      resize: vertical;
      min-height: 100px;
      font-family: inherit;
    }
    .hint {
      font-size: 13px;
      color: var(--color-text-light);
      margin-top: var(--spacing-xs);
      font-style: italic;
    }
  `,
})
export class FilterTextareaComponent {
  label = input<string>("Texte");
  value = input<string>("");
  placeholder = input<string>("");
  rows = input<number>(4);
  hint = input<string>("");
  valueChange = output<string>();

  internalValue = signal("");

  constructor() {
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  onChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.internalValue.set(target.value);
    this.valueChange.emit(target.value);
  }
}
