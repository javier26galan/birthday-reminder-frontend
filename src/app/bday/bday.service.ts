import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BdayItem } from '../models/bday-item';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BdayService {
  apiUrl: string = environment.apiUrl;
  user!: User | null;
  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getUser().subscribe((user: User | null) => {
      this.user = user;
    });
  }

  postBdayItem(bdayItem: BdayItem) {
    return this.userService.getUser().pipe(
      switchMap((user: User | null) => {
        if (!user) {
          throw new Error('User id not exist');
        }
        // Realiza la solicitud POST con el ID del usuario
        return this.http.post<BdayItem>(
          `${this.apiUrl}/new/${user.id}`,
          bdayItem
        );
      })
    );
  }
}
