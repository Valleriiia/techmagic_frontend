import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  getMachines(): Observable<any> {
    return this.http.get(`${this.baseUrl}/machines`);
  }

  getMachine(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/machines/${id}`);
  }

  createMachine(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/machines`, data);
  }

  updateMachine(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/machines/${id}`, data);
  }

  deleteMachine(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/machines/${id}`);
  }

  getRepairs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/repairs`);
  }

  getRepair(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/repairs/${id}`);
  }

  createRepair(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/repairs`, data);
  }

  updateRepair(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/repairs/${id}`, data);
  }

  deleteRepair(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/repairs/${id}`);
  }

  getRepairTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/repair-types`);
  }

  getRepairType(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/repair-types/${id}`);
  }

  createRepairType(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/repair-types`, data);
  }

  updateRepairType(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/repair-types/${id}`, data);
  }

  deleteRepairType(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/repair-types/${id}`);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
}
