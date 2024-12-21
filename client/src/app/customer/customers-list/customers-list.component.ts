import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Customer } from '../../_models/customer';
import { CustomerService } from '../../_services/customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-customers-list',
  standalone:true,
  templateUrl: './customers-list.component.html',
  imports: [
    FormsModule,
    MatGridListModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginator,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckbox,
  ],
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent{
  
  private customerService = inject(CustomerService);
  private router  =inject(Router);
  private toastr = inject(ToastrService);
  customers: Customer[] = []; // Array to hold the customer data
  loading: boolean = false;  // Optional loading indicator
  errorMessage: string = ''; // Optional error handling
  
  appUserId = '';

  displayedColumns: string[] = ['select','FirstName', 'LastName', 'VatNumber', 'Phone'];

  dataSource = new MatTableDataSource<Customer>([]);
  selection = new SelectionModel<Customer>(true, []);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.appUserId = localStorage.getItem('userId') as string ;
    console.log(this.appUserId)
    this.fetchCustomers(this.appUserId);
    
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  fetchCustomers(appUserId: string): void {
    this.loading = true;
    this.customerService.getCustomersByAppUserId(appUserId).subscribe({
      next: (data) => {
        this.customers= data;
        this.loading = false;
        this.dataSource = new MatTableDataSource<Customer>(this.customers)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch customers';
        console.error(error);
        this.loading = false;
      },
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Customer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onCreateCustomer(){
    this.router.navigateByUrl('/customer/create');
  }
}
