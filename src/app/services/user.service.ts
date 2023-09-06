import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: Subject<User | null> = new BehaviorSubject<User | null>(
    this.loadUserFromLocalStorage()
  );
  user$: Observable<User | null> = this.userSubject
    .asObservable()
    .pipe(shareReplay(1));
  constructor() {
    this.loadUserFromLocalStorage();
  }

  updateUser(user: User | null) {
    this.userSubject.next(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }
  getCurrentUser() {
    this.user$.subscribe((user: User | null) => {
      console.log(user);
      return user;
    });
  }

  private loadUserFromLocalStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setUser(user: User | null) {
    console.log("user seteado");
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser() {
    this.updateUser(null);
    localStorage.removeItem('user');
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }
}
