import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../material/material.module';
interface Customer {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'company', 'phone', 'email', 'status'];
  dataSource = new MatTableDataSource<Customer>([]);
  totalCustomers = 0;
  pageSize = 5;
  pageIndex = 0;
  customerFilter: string = '';
  statusFilter: string = '';

  customers: Customer[] = [
    { id: 1, name: "John Doe", company: "Tech Solutions Inc.", phone: "(123) 456-7890", email: "john.doe@example.com", status: "new" },
    { id: 2, name: "Jane Smith", company: "FinTech Co.", phone: "(321) 654-0987", email: "jane.smith@fintech.com", status: "contacted" },
    { id: 3, name: "Alan Johnson", company: "HealthTech Ltd.", phone: "(987) 654-3210", email: "alan.johnson@healthtech.com", status: "qualified" },
    { id: 4, name: "Emily Davis", company: "EduTech", phone: "(555) 123-4567", email: "emily.davis@edutech.com", status: "new" },
    { id: 5, name: "Michael Brown", company: "Green Finance", phone: "(555) 987-6543", email: "michael.brown@greenfinance.com", status: "contacted" },
    { id: 6, name: "Sarah Wilson", company: "Healthcare Innovations", phone: "(555) 654-3210", email: "sarah.wilson@healthcareinnovations.com", status: "qualified" },
  ];

  ngOnInit() {
    this.dataSource.data = this.customers;
    this.totalCustomers = this.customers.length;
  }

  applyFilters() {
    this.dataSource.data = this.customers.filter(customer => {
      return (
        (this.customerFilter ? customer.name.toLowerCase().includes(this.customerFilter.toLowerCase()) || customer.company.toLowerCase().includes(this.customerFilter.toLowerCase()) : true) &&
        (this.statusFilter ? customer.status === this.statusFilter : true)
      );
    });
  }

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
