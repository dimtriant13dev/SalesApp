import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router  =inject(Router);
  model:any = {};

  onLogin(){
    this.accountService.login(this.model).subscribe({
      next: _=>{
        this.router.navigateByUrl('/appointments');
      },
      error: error => console.log(error)
    })
  }

  onLogOut(){
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }
}
