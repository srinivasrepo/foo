import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { CustomerSearchModel, CustomerchangeStatusModel } from '../models/customerModel';
import { CommonMethods } from 'src/app/common/utilities/commonMethods';

@Component({
    templateUrl:'../html/searchCustomer.html'
})

export class SearchCustomerComponent{

    customerSelectStatusArray:Array<any>;
    customerSelectTypeArray:Array<any>;

    headersToCpmGridTable:Array<any>=[];
    actionsToCpmGridTable:Array<string>=[];
    dataSourceToCpmGridTable:Array<object>=[];


    searchCustomerFormGroup:FormGroup;
    customerSearchModelObject:CustomerSearchModel = new CustomerSearchModel();
    customerchangeStatusModel:CustomerchangeStatusModel = new CustomerchangeStatusModel();
    commonMethods:CommonMethods = new CommonMethods();


    constructor(private _router:Router, private _formBuilder:FormBuilder, private _customerService:CustomerService){
        this.searchCustomerFormGroup = _formBuilder.group({
            customerNameFCN:[''],
            statusIdFCN:[''],
            categoryTypeIdFCN:['']
        })
    }

    ngAfterContentInit(){
      this._customerService.getStatusDetails("CUST");
      this._customerService.getCategoryItems("CUST");
      this.prepareHeaders();
      this.prepareActions();
      this.search("searchAll","anEmptyString")


      this._customerService.customerSubject.subscribe(res=>{
          if(res.purpose == "getStatusDetails"){
              this.customerSelectStatusArray = res.result
          }
          if(res.purpose == "CUST"){
            this.customerSelectTypeArray = res.result
          }
          if(res.purpose == "searchCustomer"){
            this.dataSourceToCpmGridTable = this.commonMethods.increaseSno(res.result.searchList);
          }
          if(res.purpose == "changeStatus"){
              this.search("searchGiven","")
          }
      })
    }

    formGroupShortcut(){
      return  this.searchCustomerFormGroup.controls;
    }

    search(type:string, anySplEvent:string){
     
        if(type=="searchAll" && anySplEvent =="anEmptyString"){
            console.log("all");    
            this.searchCustomerFormGroup.reset();
            this.customerSearchModelObject = new CustomerSearchModel();
        }

        if(type == "searchGiven" && anySplEvent !="paginotorEvent"){
            this.customerSearchModelObject.customerName = this.formGroupShortcut().customerNameFCN.value;
            this.customerSearchModelObject.statusID = this.formGroupShortcut().statusIdFCN.value;
            this.customerSearchModelObject.customerType = this.formGroupShortcut().categoryTypeIdFCN.value;
        }

        this._customerService.searchCustomer(this.customerSearchModelObject);
    }


    prepareHeaders(){
        this.headersToCpmGridTable.push({"header":"S NO", "ColumnDef":"sno", cellFunction:(rowObject:any)=>`${rowObject.sno}`});
        this.headersToCpmGridTable.push({"header":"Customer Code", "ColumnDef":"customerCode", cellFunction:(rowObject:any)=>`${rowObject.customerCode}`})
        this.headersToCpmGridTable.push({"header":"Customer Name", "ColumnDef":"customerName", cellFunction:(rowObject:any)=>`${rowObject.customerName}`})
        this.headersToCpmGridTable.push({"header":"Status", "ColumnDef":"status", cellFunction:(rowObject:any)=>`${rowObject.status}`})
        this.headersToCpmGridTable.push({"header":"CustomerType", "ColumnDef":"customerType", cellFunction:(rowObject:any)=>`${rowObject.customerType}`})
    }
    prepareActions(){
        return this.actionsToCpmGridTable = ["View", "ChangeStatus", "Edit", "AssignProducts"] 
    }
    onActionClickedEventEmmitter(event){
        console.log(event);
        
       if(event.action == "View"){
          this._router.navigate(['/viewCustomer'],{queryParams:{encCustomerID:event.ProductRow.encCustomerID}})
       }
       if(event.action == "Edit"){
           this._router.navigate(['/manageCustomer'],{queryParams:{encCustomerID:event.ProductRow.encCustomerID}})
       }
       if(event.action == "ChangeStatus"){
        this.customerchangeStatusModel.encID = event.ProductRow.encCustomerID; 
        this._customerService.changeStatus(this.customerchangeStatusModel)
       }
       if(event.action == "AssignProducts"){
           
       }

    }
    addCustomer(){
      this._router.navigate(['/manageCustomer'])
    }
}