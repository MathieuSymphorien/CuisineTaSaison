import { Component, input, output, signal } from "@angular/core";
import { Season, SEASONS } from "src/app/Models/season.model";

@Component({
  selector: "app-filter-season",
  standalone: true,
  template: `<div class="filter-box">
    <div class="header">{{ label() }}</div>
    @for(opt of seasons; track opt){
    <label>
      <input
        type="checkbox"
        [checked]="selected().has(opt)"
        (change)="toggleSeason(opt)"
      />
      {{ opt }}
    </label>
    }
  </div> `,
})
export class FilterSeasonComponent {
  label = input<string>("Saison");
  seasons = Object.keys(SEASONS) as Season[];
  selected = signal<Set<Season>>(new Set());
  valueChange = output<Season[]>();

  toggleSeason(season: Season) {
    const s = new Set(this.selected());
    s.has(season) ? s.delete(season) : s.add(season);
    this.selected.set(s);
    this.valueChange.emit(Array.from(s));
  }
}
