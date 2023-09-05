import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService) {}
  isAuthenticated(): boolean {
    if (localStorage.getItem("user")) {
      return true
    }else{
      return false
    }
  }
  login(): void {

  }

  logout(): void {
    localStorage.removeItem("user")
    this.userService.updateUser(null);
  }
}
