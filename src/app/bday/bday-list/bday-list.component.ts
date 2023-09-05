import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var handleSignOut: any;

@Component({
  selector: 'app-bday-list',
  templateUrl: './bday-list.component.html',
  styleUrls: ['./bday-list.component.scss']
})
export class BdayListComponent {
  constructor(private router: Router){}

  onSignOut(){
    handleSignOut()
    localStorage.removeItem('user');
    this.router.navigate(['/login']).then(()=>{
      window.location.reload();
    })
  }
}
