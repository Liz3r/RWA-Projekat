import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string){
    return this.http.post(`${API_URL}/auth/login`, {});
  }

}
