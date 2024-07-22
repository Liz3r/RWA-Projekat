import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDto } from '../dtos';
import { API_URL } from '../env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(createUserDto: CreateUserDto){
    return this.http.post(`${API_URL}/user/register`, createUserDto);
  }
}
