import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user.service';
import { User } from '../models/user';
import { catchError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = environment.apiUrl + '/user/signup';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authservice: AuthService
  ) {}

  sendTokenToServer(credential: string) {
    const requestBody = { token: credential };
    this.http
      .post<any>(this.loginUrl, requestBody, { headers: this.headers })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return error;
        })
      )
      .subscribe((response) => {
        const user: User = {
          profilename: response.profilename,
          email: response.email,
          bdaylist: response.bdaylist || [],
          id: response._id,
          image: response.image,
        };
        this.userService.updateUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      });
  }
}
