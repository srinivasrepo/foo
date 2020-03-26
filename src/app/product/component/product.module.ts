import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/appMaterial.module';
import { ProductService } from '../services/product.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { ProductRoutingModule } from './product-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchProductComponent } from './searchProduct.component';
import { ManageProductComponent } from './manageProduct.component'
import { ViewProductComponent } from './viewProduct.component';
import { CpmHelpersModule } from 'src/app/cpmHelpers/component/cpmHelpers.module';

@NgModule({
    declarations:[SearchProductComponent,
                 ManageProductComponent,
                 ViewProductComponent             
    ],
    imports:[ProductRoutingModule,
            AppMaterialModule,
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            CpmHelpersModule
        ],
    providers:[ProductService,AlertService]
})

export class ProductModule{

}