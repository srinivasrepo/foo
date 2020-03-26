import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent } from './searchCustomer.component';
import { ManageCustomerComponent } from './manageCustomer.component'
import { ViewCustomerComponent } from './viewCustomer.component';

export const CustomerRoutes:Routes=[
    {path:'searchCustomer', component:SearchCustomerComponent},
    {path:'manageCustomer', component:ManageCustomerComponent},
    {path:'viewCustomer', component:ViewCustomerComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(CustomerRoutes)],
    exports:[RouterModule]
})

export class CustomerRoutingModule{

}