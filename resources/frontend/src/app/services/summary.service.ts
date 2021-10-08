import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

interface GenericResponse {
  message: string,
  model: any
}

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/summary-all`, {});
  }

  generate(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/summary-generate`, data);
  }
}
