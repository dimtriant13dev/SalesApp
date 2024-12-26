import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../_services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../../_models/customer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers-details-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customers-details-list.component.html',
  styleUrl: './customers-details-list.component.css'
})
export class CustomersDetailsListComponent {

  private customerService = inject(CustomerService);
  private router  =inject(Router);
  private toastr = inject(ToastrService);
  errorMessage: string = ''; // Optional error handling

  customerId: string | null = null;

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

  constructor(private route: ActivatedRoute) {
    
  }
  ngOnInit() {

    this.customerId = this.route.snapshot.paramMap.get('id');

    if (this.customerId) {
      console.log('Extracted GUID:', this.customerId);
      this.fetchCustomerDetails(this.customerId);
    } else {
      console.error('No GUID found in the URL');
    }    console.log(this.customerId)
    
   
  }

  fetchCustomerDetails(id: string){
    console.log('mpike')
    this.customerService.getCustomerById(id).subscribe({
      next: (data) => {
             this.customer= data;
           },
      error: (error) => {
            this.errorMessage = 'Failed to fetch customer';
            console.error(error);
      },
    })
  }
  onSubmit() {
    this.customerService.updateCustomer(this.customer, this.customerId).subscribe({
      next: response=>{
        this.toastr.success("Επιτυχής eniimerwsi Πελάτη!")
      },
      error: error => this.toastr.error(error.error)
    })
  }

}
