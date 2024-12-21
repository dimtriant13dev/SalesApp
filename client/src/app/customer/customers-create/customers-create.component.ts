import { Component, inject } from '@angular/core';
import { Customer } from '../../_models/customer';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../_services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-customers-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customers-create.component.html',
  styleUrl: './customers-create.component.css'
})


export class CustomersCreateComponent {

  private customerService = inject(CustomerService);
  private router  =inject(Router);
  private toastr = inject(ToastrService);
  
   customer: Customer = {
    id: '',
    position: 0,
    firstName: '',
    lastName: '',
    title: '',
    vatNumber: '',
    phoneNumber: '',
    comments: '',
    appUser : undefined 
  };

  onSubmit() {
    let user =  localStorage.getItem('user');

    if(user){
      this.customer.appUser = JSON.parse(user) as User;
      console.log(JSON.stringify(this.customer));
      this.customerService.createCustomer(this.customer).subscribe({
        next: response=>{
          this.toastr.success("Επιτυχής Δημιουργία Πελάτη!")
          this.resetForm();
        },
        error: error => this.toastr.error(error.error)
      })
    }
    else{
      this.toastr.error("Δεν βρέθηκε ο χρήστης!")
    }
    
  }

  resetForm() {
    this.customer = {
      id : '',
      firstName: '',
      position: 0,
      lastName: '',
      title: '',
      vatNumber: '',
      phoneNumber: '',
      comments: ''
    };
  }
}