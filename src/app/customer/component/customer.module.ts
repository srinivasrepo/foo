import { NgModule } from "@angular/core";
import { CustomerRoutingModule } from './customer-routing.module';
import { SearchCustomerComponent } from './searchCustomer.component';
import { ManageCustomerComponent } from './manageCustomer.component';
import { ViewCustomerComponent } from './viewCustomer.component';
import { AssignProductsToCustomerComponent } from './assignProductsToCustomer.component';
import { CustomerService } from '../services/customer.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { AppMaterialModule } from 'src/app/appMaterial.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[SearchCustomerComponent,
                  ManageCustomerComponent,
                  ViewCustomerComponent,
                  AssignProductsToCustomerComponent        
    ],
    imports:[CustomerRoutingModule,
             AppMaterialModule,
             CommonModule,
             FormsModule,
             ReactiveFormsModule      
    ],
    providers:[CustomerService,AlertService]
})

export class CustomerModule{

}