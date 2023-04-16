import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capsules } from '../models/capsules';

const baseUrl = 'http://localhost:8080/api/capsules';

@Injectable({
  providedIn: 'root'
})
export class CapsulesService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getAll(): Observable<Capsules[]> {
    return this.http.get<Capsules[]>(baseUrl);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
