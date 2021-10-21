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
export class SupplierService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/supplier-all`, {});
  }

  getSupplier() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/supplier-only`, {});
  }

  getSubcon() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/subcon-only`, {});
  }

  storeSupplier(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/supplier-store`, data);
  }

  delete(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/supplier-delete`, data);
  }
}
