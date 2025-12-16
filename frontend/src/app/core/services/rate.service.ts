import { Injectable, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rate } from '../models/rate';

@Injectable({
  providedIn: 'root',
})
export class RateService {

  private apiUrl = 'http://localhost:3000/api/rates';

  constructor(private http: HttpClient){}

  getAll(): Observable<Rate[]>{
    return this.http.get<Rate[]>(this.apiUrl);
  }

  getById(id: number): Observable<Rate>{
    return this.http.get<Rate>(`${this.apiUrl}/${id}`);
  }

  getByServices(serviceId: number): Observable<Rate[]>{
    return this.http.get<Rate[]>(`${this.apiUrl}?serviceId=${serviceId}`);
  }

  create(rate: Partial<Rate>): Observable<Rate>{
    return this.http.post<Rate>(this.apiUrl,rate);
  }

  update(id:number, rate: Partial<Rate>): Observable<Rate>{
    return this.http.patch<Rate>(`${this.apiUrl}/${id}`,rate)
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

}
