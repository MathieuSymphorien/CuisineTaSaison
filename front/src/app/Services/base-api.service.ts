import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface BaseEntity {
  id: number;
}

export abstract class BaseApiService<
  T extends BaseEntity,
  CreateDto = Omit<T, "id">,
  UpdateDto = Partial<T>,
> {
  protected abstract readonly apiUrl: string;

  constructor(protected http: HttpClient) {}

  getAll(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(entity: CreateDto): Observable<T> {
    return this.http.post<T>(this.apiUrl, entity);
  }

  update(id: number, entity: UpdateDto): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  protected buildParams(filters: Record<string, unknown>): HttpParams {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return;
      }

      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => {
          params = params.append(key, String(v));
        });
      } else if (typeof value === "boolean") {
        if (value) {
          params = params.set(key, "true");
        }
      } else if (typeof value === "number") {
        if (value > 0) {
          params = params.set(key, value.toString());
        }
      } else {
        params = params.set(key, String(value));
      }
    });

    return params;
  }
}
