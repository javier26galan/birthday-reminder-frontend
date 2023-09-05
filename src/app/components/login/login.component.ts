import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  isAuthenticated: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id:
        '719920459793-keoetr86rrmt3give979572vfn96i6u8.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }
  handleCredentialResponse = (response: any) => {
    this.loginService.sendTokenToServer(response.credential);
    this.router.navigate(['/'])
  };
}
