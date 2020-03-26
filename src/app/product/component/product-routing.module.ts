import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SearchProductComponent } from './searchProduct.component';
import { ManageProductComponent } from './manageProduct.component';
import { ViewProductComponent } from './viewProduct.component';

export const ProductRoutes:Routes=[
    {path:'searchProduct', component:SearchProductComponent},
    {path:'manageProduct',component:ManageProductComponent},
    {path:'viewProduct', component:ViewProductComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(ProductRoutes)],
    exports:[RouterModule]
})

export class ProductRoutingModule{

}