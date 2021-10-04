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
export class FileUploadService {

  constructor(private http: HttpClient) { }

  storeFile(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/file-store`, data);
  }

  clearDo() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/file-cleardo`, {});
  }
}
