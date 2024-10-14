import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { CustomersListComponent } from './customer/customers-list/customers-list.component';
import { UsersDetailListComponent } from './users/users-detail-list/users-detail-list.component';
import { CustomersDetailsListComponent } from './customer/customers-details-list/customers-details-list.component';
import { AppointmentsListComponent } from './appointments/appointments-list/appointments-list.component';
import { AppointmentsDetailsListComponent } from './appointments/appointments-details-list/appointments-details-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomersCreateComponent } from './customer/customers-create/customers-create.component';
import { authGuard } from './_guards/auth.guard';
  
export const routes: Routes = [
    {path:'',component: LoginComponent},
    {
        path:'',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children:
        [
            {path:'users',component: UsersListComponent},
            {path:'register',component: RegisterComponent},
            {path:'login',component: LoginComponent},
            {path:'users/:id',component: UsersDetailListComponent},
            {path:'customer',component: CustomersListComponent},
            {path:'customer/create',component: CustomersCreateComponent},
            {path:'customer/:id',component: CustomersDetailsListComponent},
            {path:'appointments',component: AppointmentsListComponent},
            {path:'appointments/:id',component: AppointmentsDetailsListComponent},
        ]
    },
   
    {path:'**',component: HomeComponent,pathMatch: 'full'},


];
