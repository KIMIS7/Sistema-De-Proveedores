import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  private apiUrl = 'http://localhost:3000/api/services';

  constructor(private http: HttpClient){}

  getAll(): Observable <Service[]>{
    return this.http.get<Service[]>(this.apiUrl);
  }

  getById(id:number): Observable <Service>{
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  getByProvider(providerId:number): Observable <Service[]>{
    return this.http.get<Service[]>(`${this.apiUrl}?providerId=${providerId}`);
  }

  create(service: Partial<Service>): Observable <Service>{
    return this.http.post<Service>(this.apiUrl, service);
  }
  
  update(id: number, service: Partial<Service>): Observable <Service>{
    return this.http.patch<Service>(`${this.apiUrl}/${id}`, service);
  }
  
  delete(id: number): Observable <void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
