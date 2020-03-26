import { NgModule } from "@angular/core";
import { EnvironmentRoutingModule } from './environment-routing.module';
import { HomeComponent } from '../home/component/home.component';
import { ProductModule } from '../product/component/product.module';
import { CustomerModule } from '../customer/component/customer.module';
import { AppMaterialModule } from '../appMaterial.module';

@NgModule({
    declarations:[HomeComponent],
    imports:[
        EnvironmentRoutingModule,
        ProductModule,
        CustomerModule,
        AppMaterialModule        
    ],
    providers:[],
    entryComponents:[]
})

export class EnvironmentModule{

}