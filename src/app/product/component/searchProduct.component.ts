import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchProductModel, StatusDetails } from '../models/productModel';
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
    statusDetails:StatusDetails = new StatusDetails();
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

    this._productService.getStatusDetails(ProductServiceUrls.getStatusDetailsUrl, StatusDetails.code);
    this.search("searchAll","");
    this.prepareHeadersForCpmGridTable();



    this.subscription = this._productService.productSubject.subscribe(res=>{
      if(res.purpose == "getStatusDetails"){
        this.productSelectStatusArray = res.result;        
      }
      if(res.purpose == "searchProduct"){
       
        this.dataSourceToCpmGridTable = this.commonMethods.increaseSno(res.result.searchList);
        this.actionsToCpmGridTable = ["View", "Change Status", "Edit"];

        
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
    this.headersToCpmGridTable.push({"ColumnDef":"sno", "Header":"S NO", cellFunction:(dataSourceRowObject:any)=> `${dataSourceRowObject.sno}` });
    this.headersToCpmGridTable.push({"ColumnDef":"productCode", "Header":"Product Code", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.productCode}`});
    this.headersToCpmGridTable.push({"ColumnDef":"productName", "Header":"Product Name", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.productName}`});
    this.headersToCpmGridTable.push({"ColumnDef":"productCost", "Header":"Product Cost", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.productCost}`});
    this.headersToCpmGridTable.push({"ColumnDef":"status", "Header":"Status", cellFunction:(dataSourceRowObject:any)=>`${dataSourceRowObject.status}`});
  }

  addProduct(){
   return this._router.navigate(['home/searchProduct/manageProduct']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}