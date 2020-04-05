import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductServiceUrls } from '../services/productServiceUrls';
import { Subscription } from 'rxjs';
import { ViewProductModel } from '../models/productModel';

@Component({
    templateUrl:'../html/viewProduct.html'
})

export class ViewProductComponent{
    encProductID:any;
    
    subscription:Subscription = new Subscription();
    viewProductModelObject:ViewProductModel = new ViewProductModel();

    constructor(private _router:Router, private _activatedRoute:ActivatedRoute, private _productService:ProductService){}

    ngAfterContentInit(){
        this._activatedRoute.queryParams.subscribe(param=>{            
            this.encProductID = param.encProductID;
        })

        this._productService.viewProduct(ProductServiceUrls.viewProduct, this.encProductID);
 
        this.subscription = this._productService.productSubject.subscribe(res=>{
            if(res.purpose == "viewProduct"){
                this.viewProductModelObject.productCode = res.result.productCode 
                this.viewProductModelObject.productName = res.result.productName 
                this.viewProductModelObject.productCost = res.result.productCost                
                this.viewProductModelObject.status = res.result.status 
                this.viewProductModelObject.description = res.result.description 
            }
        })

        
    }

    goBack(){
       this._router.navigate(['/home/searchProduct'])
    }
}

