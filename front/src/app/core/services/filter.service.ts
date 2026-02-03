// services/filter.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class FilterService<T> {
  private filtersSubject = new BehaviorSubject<T | null>(null);
  filters$ = this.filtersSubject.asObservable();

  updateFilters(filters: T): void {
    this.filtersSubject.next(filters);
    console.log("Filtres mis à jour :", filters); // Simulation de l'envoi au back
  }
}
