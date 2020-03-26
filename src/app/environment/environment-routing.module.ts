import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/component/home.component';
import { SearchProductComponent } from '../product/component/searchProduct.component';
import { ProductRoutes } from '../product/component/product-routing.module';
import { SearchCustomerComponent } from '../customer/component/searchCustomer.component';
import { CustomerRoutes } from '../customer/component/customer-routing.module'

const EnvRoutes:Routes=[
    {path:'home', component:HomeComponent,
     children:[
         {path:'searchProduct', component:SearchProductComponent},
         {path:'searchProduct', children: ProductRoutes},

         {path:'searchCustomer', component:SearchCustomerComponent},
         {path:'searchCustomer', children: CustomerRoutes},
     ]
}
];

@NgModule({
    imports:[RouterModule.forRoot(EnvRoutes)],
    exports:[RouterModule]
})

export class EnvironmentRoutingModule{

}