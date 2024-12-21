import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  accountService = inject(AccountService);
  private router  =inject(Router);
  private toastr = inject(ToastrService);
  model:any = {};

  onLogin(){
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: _=>{
        this.setCurrentUser();
        this.router.navigateByUrl('/home');
      },
      error: error => this.toastr.error(error.error)
    })
  }

  onLogOut(){
    this.accountService.logOut();
    this.router.navigateByUrl('/login');
  }

  onRegister(){
    this.router.navigateByUrl('/register');
  }
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    
    if(!userString) return;

    const user = JSON.parse(userString);

    this.accountService.currentUser.set(user);
  }
}
