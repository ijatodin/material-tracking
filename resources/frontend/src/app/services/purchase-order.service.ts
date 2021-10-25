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
export class PurchaseOrderService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/po-all`, {});
  }

  storeData(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/po-store`, data);
  }

  delete(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/po-delete`, data);
  }
}
