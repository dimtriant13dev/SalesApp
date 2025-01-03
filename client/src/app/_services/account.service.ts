import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';

  currentUser = signal<User |null>(null);
  
  login(model:any){
    return this.http.post<User>(this.baseUrl +'account/login',model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          localStorage.setItem('userId',user.id);
          this.currentUser.set(user);
        }
      })
    );
  }
  register(model:any){
    return this.http.post<User>(this.baseUrl +'account/register',model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          localStorage.setItem('userId',JSON.stringify(user.id));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }
  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.currentUser.set(null);
  }
}
