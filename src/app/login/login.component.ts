import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuth } from '../model/userAuth';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  isLoggedIn:boolean;

  ngOnInit(): void {

    this.auth.iUserLoggedInEmit.subscribe((islogin:boolean) => {
      this.isLoggedIn = islogin;
    })

    if(this.isLoggedIn){
      this.router.navigate(['/home']);
    }
  }

  username!:string;
  password!:string;
  errMessage:string='';
  onSubmit(loginform: NgForm) {
    this.errMessage = '';
    let userAuth:UserAuth=new UserAuth(this.username, this.password);
    if(this.auth.login(userAuth)){
      this.router.navigate(['/home']);
    }else{
      this.errMessage = 'Please enter valid username and password';
    }
  }

}

