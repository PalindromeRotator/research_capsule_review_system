import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';

const baseUrl = 'https://research-capsule-review-system.vercel.app/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(baseUrl);
  }

  getAllFaculty(): Observable<Users[]> {
    return this.http.get<Users[]>(`${baseUrl}/faculty`);
  }

  getAllReviewer(): Observable<Users[]> {
    return this.http.get<Users[]>(`${baseUrl}/reviewer`);
  }

  get(data: any): Observable<Users> {
    return this.http.get(`${baseUrl}/${data.email}/${data.password}`);
  }

  getById(id: any): Observable<Users> {
    return this.http.get(`${baseUrl}/${id}`)
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  // findByTitle(title: any): Observable<Users[]> {
  //   return this.http.get<Users[]>(`${baseUrl}?title=${title}`);
  // }
}