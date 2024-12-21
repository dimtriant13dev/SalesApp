import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map, Observable } from 'rxjs';
import { Customer } from '../_models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';

  createCustomer(model:any){
    return this.http.post<Customer>(this.baseUrl +'customer/createcustomer',model).pipe(
      map(customer =>{
        return customer;
      })
    );
  }
  getCustomersByAppUserId(appUserId: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}customer/customersByAppUserId?appUserId=${appUserId}`).pipe(
      map(customers => {
        return customers; // Map step is redundant here unless further transformations are needed
      })
    );
  }
}
