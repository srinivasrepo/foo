import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchProductModel, StatusDetailsModel, ChangeStatusModel } from '../models/productModel';
import { ProductService } from '../services/product.service';
import { ProductServiceUrls } from '../services/productServiceUrls';
import { Subscription } from 'rxjs';
import { CommonMethods } from 'src/app/common/utilities/commonMethods';

@Component({
    templateUrl:'../html/searchProduct.html'
})

export class SearchProductComponent{

    searchProductFormGroup:FormGroup;
    searchProductModelObject:SearchProductModel =new SearchProductModel();
    statusDetailsModelObject:StatusDetailsModel = new StatusDetailsModel();
    ChangeStatusModelObject:ChangeStatusModel = new ChangeStatusModel();

    subscription:Subscription = new Subscription();
    commonMethods:CommonMethods= new CommonMethods();

    productSelectStatusArray:Array<any>;
    dataSourceToCpmGridTable:any[];
    headersToCpmGridTable:any[];
    actionsToCpmGridTable:string[];


  constructor(private _formBuilder:FormBuilder, private _router:Router, private _productService:ProductService){
    this.searchProductFormGroup = _formBuilder.group({
        productNameFCN:[''],
        statusIdFCN:['']
    })
  }    

  ngAfterContentInit(){

    this._productService.getStatusDetails(ProductServiceUrls.getStatusDetailsUrl, StatusDetailsModel.code);
    this.search("searchAll","");
    this.prepareHeadersForCpmGridTable();



    this.subscription = this._productService.productSubject.subscribe(res=>{
      if(res.purpose == "getStatusDetails"){
        this.productSelectStatusArray = res.result;        
      }
      if(res.purpose == "searchProduct"){
       
        this.dataSourceToCpmGridTable = this.commonMethods.increaseSno(res.result.searchList);
        this.actionsToCpmGridTable = ["View", "ChangeStatus", "Edit"];        
      }
      if(res.purpose == "changeStatus"){
        if(res.result == "SUCCESS"){
          this.search("searchGiven","anEmptyString")
        }
        
      }
      
    })

    
      
  }

  spFormGroupShortcut(){
     return this.searchProductFormGroup.controls
  }

  search(type:string, ifAnySpecification:string){

//SEARCH ALL
// If we send an empty object then we get all products bcz of conditional statements in server-side API
// so we have the empty the values in both (form i.e formGroup) and ModelClassObject
    if(type == "searchAll"){
      this.searchProductFormGroup.reset();
      this.searchProductModelObject= new SearchProductModel();

    }
//SEARCHGIVEN
    if(type == "searchGiven" && ifAnySpecification != "paginotorEvent" ){
        this.searchProductModelObject.product = this.spFormGroupShortcut().productNameFCN.value;
        this.searchProductModelObject.statusID = this.spFormGroupShortcut().statusIdFCN.value;
    }

    this._productService.searchProduct(ProductServiceUrls.searchProduct, this.searchProductModelObject)

  }

  prepareHeadersForCpmGridTable(){
    this.headersToCpmGridTable=[];
    this.headersToCpmGridTable.push({"ColumnDef":"sno", "header":"S NO", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.sno}`});
    this.headersToCpmGridTable.push({"ColumnDef":"productCode", "header":"Product Code", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.productCode}`});
    this.headersToCpmGridTable.push({"ColumnDef":"productName", "header":"Product Name", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.productName}`});
    this.headersToCpmGridTable.push({"ColumnDef":"productCost", "header":"Product Cost", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.productCost}`});
    this.headersToCpmGridTable.push({"ColumnDef":"status", "header":"Status", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.status}`});
  }

  onActionClickedEventEmmitter(event:any){
console.log(event);
   if(event.action == "View"){
    this._router.navigate(['/viewProduct'],{queryParams:{encProductID:event.ProductRow.encProductID}})
  }
  if(event.action == "Edit"){
    this._router.navigate(['/manageProduct'],{queryParams:{encProductID:event.ProductRow.encProductID}})
  }
  if(event.action == "ChangeStatus"){
    this.ChangeStatusModelObject.encID = event.ProductRow.encProductID;
    this._productService.changeStatus(ProductServiceUrls.changeStatus, this.ChangeStatusModelObject)
  }


  }

  addProduct(){
   return this._router.navigate(['home/searchProduct/manageProduct']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}