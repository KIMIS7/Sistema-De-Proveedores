import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/provider';

//Injeccion de dependencias
@Injectable({
  providedIn: 'root',
})

export class ProviderService{
  private apiUrl = 'http://localhost:3000/api/providers';

  constructor(private http: HttpClient){}
//Obtenemos todos
  getAll(): Observable<Provider[]>{
    return this.http.get<Provider[]>(this.apiUrl);
  }
// Obtenemos por ID
  getById(id: number): Observable <Provider> {
    return this.http.get<Provider>(`${this.apiUrl}/${id}`);
  }
//Creamos provedor
  create(provider: Partial<Provider>): Observable<Provider> {
    return this.http.post<Provider>(this.apiUrl, provider);
  }
//Actualizamos
  update(id: number, provider: Partial<Provider>): Observable <Provider>{
    return this.http.patch<Provider>(`${this.apiUrl}/${id}`, provider);
  }
//Eliminamos
  delete(id: number): Observable <void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

