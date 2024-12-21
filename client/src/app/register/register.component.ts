import { Component, EventEmitter, inject, input, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export enum Departments{
  Main=0,
  Branch=1
}
export enum UserRoles{
  Admin=0,
  SalesPerson=1,
  Owner=2,
  Support=3
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private router  =inject(Router);
  private toastr = inject(ToastrService);
  
  cancelRegister = output<boolean>();//@Output() canRegister = new EventEmitter();
  model:any={}
  departments : typeof Departments = Departments;
  userRoles : typeof UserRoles = UserRoles;


  OnRegister(){
    this.accountService.register(this.model).subscribe({
      next: response=>{
        this.toastr.success("Επιτυχής εγγραφή χρήστη!")
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
      
    
  }
  
  cancel(){
    this.cancelRegister.emit(false);
    this.router.navigateByUrl('/login');
  }
}
