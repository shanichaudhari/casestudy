import { EventEmitter, Injectable } from '@angular/core';
import { UserAuth } from '../model/userAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(userAut:UserAuth):boolean{
    if (userAut.username == "user" && userAut.password == "user") {
      localStorage.setItem('isLoggedIn', '1');
      this.isLoggedIn();
      return true;
    }else{
      localStorage.removeItem('isLoggedIn');
      this.isLoggedIn();
      return false;
    }
  }

  iUserLoggedInEmit = new EventEmitter<boolean>();
  isLoggedIn(){
    if (localStorage.getItem('isLoggedIn') == "1") {
      this.iUserLoggedInEmit.emit(true);
      return true;
    }else{
      this.iUserLoggedInEmit.emit(false);
      return false;
    }

  }

  logout():boolean{
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn();
    return true;
  }

}
