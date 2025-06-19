import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtendedFile } from '../interfaces/extendedFile';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiEndpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  selectFolder(): Observable<{ path: string }> {
    return this.http.get<{ path: string }>(`${this.apiEndpoint}/select-folder`);
  }

  getFiles(path: string): Observable<Array<ExtendedFile>> {
    return this.http.get<ExtendedFile[]>(`${this.apiEndpoint}/files?path=${encodeURIComponent(path)}`);
  }
}
