import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { CustomerViewModel } from '../models/customerModel';
import { CommonMethods } from 'src/app/common/utilities/commonMethods';

@Component({
    templateUrl:'../html/viewCustomer.html'
})

export class ViewCustomerComponent{
    encCustomerID:string;
    headersToCpmGridTable:any[]=[];
    dataSourceToCpmGridTable:Array<any>=[];

    subscription:Subscription = new Subscription();
    customerViewModelObject:CustomerViewModel = new CustomerViewModel();
    commonMethods:CommonMethods = new CommonMethods();

    constructor(private _activatedRoute:ActivatedRoute, private _customerService:CustomerService, private _router:Router){}

    ngAfterContentInit(){
        this._activatedRoute.queryParams.subscribe(res=>{ this.encCustomerID = res.encCustomerID});
        this.prepareHeaders();

        this._customerService.viewCustomer(this.encCustomerID);
        this.subscription = this._customerService.customerSubject.subscribe(res=>{
            if(res.purpose == "viewCustomer"){
                this.customerViewModelObject.customerCode = res.result.customerCode;
                this.customerViewModelObject.customerName = res.result.customerName;
                this.customerViewModelObject.customerType = res.result.customerType;
                this.customerViewModelObject.status = res.result.status;
                this.customerViewModelObject.assignedProducts = [res.result.assignedProducts];
                this.customerViewModelObject.addressList = res.result.addressList;
                this.dataSourceToCpmGridTable = this.commonMethods.increaseSno(this.customerViewModelObject.addressList)
            }
        })

    }
  
    prepareHeaders(){
        this.headersToCpmGridTable.push({"header":"S No", "ColumnDef":"sno", cellFunction:(rowObject)=>`${rowObject.sno}`});
        this.headersToCpmGridTable.push({"header":"Address", "ColumnDef":"address", cellFunction:(rowObject)=>`${rowObject.address}`})
        this.headersToCpmGridTable.push({"header":"Country Name", "ColumnDef":"countryName", cellFunction:(rowObject)=>`${rowObject.countryName}`})
        this.headersToCpmGridTable.push({"header":"State", "ColumnDef":"state", cellFunction:(rowObject)=>`${rowObject.state}`})
        this.headersToCpmGridTable.push({"header":"City", "ColumnDef":"city", cellFunction:(rowObject)=>`${rowObject.city}`})
        this.headersToCpmGridTable.push({"header":"Zip", "ColumnDef":"zip", cellFunction:(rowObject)=>`${rowObject.zip}`})
    }

    goBack(){
      this._router.navigate(['/home/searchCustomer'])
    }


    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}