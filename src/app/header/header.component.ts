import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  isLoggedIn:boolean;

  ngOnInit(): void {
    this.auth.iUserLoggedInEmit.subscribe((islogin:boolean) => {
      this.isLoggedIn = islogin;
    })
  }

  onLogout(){
    if (this.auth.logout()) {
      this.router.navigate(['/']);
    }
  }
}
