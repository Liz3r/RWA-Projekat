import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../env';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string){
    return this.http.post<{user_id: number, user_email: string, user_firstname: string}>
    (`${API_URL}/auth/login`, {user_email: username, user_password: password}, {withCredentials: true});
  }

  register(createUserDto: CreateUserDto){
    return this.http.post(`${API_URL}/user/register`, createUserDto, { withCredentials: true });
  }

  updateProfile(updatedUser: User){
    return this.http.patch<User>(`${API_URL}/user/update`, updatedUser, {withCredentials: true});
  }

  loadProfile(){
    return this.http.get<User>(`${API_URL}/user/byId`, {withCredentials: true});
  }

  checkToken(){
    return this.http.get<{user_id: number, user_email: string, user_firstname: string}>
    (`${API_URL}/auth/checkToken`, { withCredentials: true });
  }

}
