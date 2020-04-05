import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router';
import { ManageProductModel } from '../models/productModel';
import { ProductService } from '../services/product.service';
import { ProductServiceUrls } from '../services/productServiceUrls';
import { Subscription } from 'rxjs';
import { AlertService } from '../../common/services/alert.service';
import { ProductMesseges } from '../messeges/productMesseges'
import { CommonMethods } from 'src/app/common/utilities/commonMethods';

@Component({
    templateUrl:'../html/manageProduct.html'
})

export class ManageProductComponent{

    manageProductFormGroup:FormGroup;
    manageProductModelObject:ManageProductModel = new ManageProductModel();
    commonMethods:CommonMethods = new CommonMethods();

    subscription:Subscription;

    encProductID:string;
    toggleEditAndSave:string = "ADD/EDIT";


    constructor(private _formBuilder:FormBuilder, private _router:Router, 
        private _productService:ProductService, private _notify:AlertService, private _activatedRoute:ActivatedRoute){
        this.manageProductFormGroup = _formBuilder.group({
            productNameFCN:[''],
            productCostFCN:[''],
            productDescriptionFCN:['']
        })
    }
    
    ngAfterContentInit(){
        this._activatedRoute.queryParams.subscribe(res=>{ 
            this.encProductID = res.encProductID;
        })
        if(this.encProductID){ 
            this._productService.viewProduct(ProductServiceUrls.viewProduct, this.encProductID);
            this.toggleEditAndSave = "UPDATE";
            this.manageProductFormGroup.disable();
        }

        this.subscription = this._productService.productSubject.subscribe(response=>{
            if(response.purpose == "manageProduct"){
                if(response.result == "SUCCESS"){
                    if(this.encProductID){
                      return  this._notify.success(ProductMesseges.productUpdatedSuccessfully), this.goBack();
                    }
                    this._notify.success(ProductMesseges.productAddedSuccessfully);
                    this.goBack();
                }      
            }
            if(response.purpose == "viewProduct"){
                this.formGroupShortcut().productNameFCN.setValue(response.result.productName);
                this.formGroupShortcut().productCostFCN.setValue(response.result.productCost);
                this.formGroupShortcut().productDescriptionFCN.setValue(response.result.description);
                
            }
        })
    }

    formGroupShortcut(){
       return this.manageProductFormGroup.controls;
    }

    addOrEdit(){ 
        if(this.toggleEditAndSave == "UPDATE"){
            return this.toggleEditAndSave = "ADD/EDIT", this.manageProductFormGroup.enable();
        }

        var errorMessage = this.validateForm();
        if(this.commonMethods.hasValue(errorMessage)){
            return this._notify.warning(errorMessage)
        }

        this.manageProductModelObject.productName = this.formGroupShortcut().productNameFCN.value;
        this.manageProductModelObject.productCost = this.formGroupShortcut().productCostFCN.value;
        this.manageProductModelObject.description = this.formGroupShortcut().productDescriptionFCN.value;
        if(this.encProductID){
            this.manageProductModelObject.encProductID = this.encProductID;
        }

        console.log(this.manageProductModelObject);
        
        this._productService.manageProduct(ProductServiceUrls.manageProduct, this.manageProductModelObject)
    }

    validateForm(){
      if(!this.commonMethods.hasValue(this.formGroupShortcut().productNameFCN.value)){
        return ProductMesseges.emptyProductName;
      }
      var productNameRegularExpression = /^[A-Za-z\s]+$/;
      if(!productNameRegularExpression.test((this.formGroupShortcut().productNameFCN.value))){
         return ProductMesseges.validProductName;
      }
      if(!this.commonMethods.hasValue(this.formGroupShortcut().productCostFCN.value)){
        return ProductMesseges.emptyProductCost;
      }
      var productCostRegularExpression = /^[0-9]{0-8}+$/;
      if(!productCostRegularExpression.test(this.formGroupShortcut().productCostFCN.value)){
       
      }
      if(!this.commonMethods.hasValue(this.formGroupShortcut().productDescriptionFCN.value)){
        return ProductMesseges.emptyProductDescription;
      } 
    }

    goBack(){
        this._router.navigate(["/home/searchProduct"])
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}