import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../env';
import { SignInDto } from '../dtos/signIn.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(signInDto: SignInDto){
    return this.http.post<{user_id: number, user_email: string, token: string}>(`${API_URL}/auth/login`, signInDto, {withCredentials: true});
  }

}
