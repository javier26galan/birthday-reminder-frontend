import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges, OnInit {
  @Input() userInput: User | null = null;
  user: User | null = null;
  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.user = changes['userInput'].currentValue;
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: User | null) => {
      this.user = user;
    });
  }
}
