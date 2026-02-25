import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Units } from "src/app/shared/models/units.model";

@Injectable({
  providedIn: "root",
})
export class DataApiService {
  protected readonly apiUrl = "/api/data";
  constructor(protected http: HttpClient) {}

  getUnits(): Observable<Units[]> {
    return this.http.get<Units[]>(`${this.apiUrl}/units`);
  }
}
