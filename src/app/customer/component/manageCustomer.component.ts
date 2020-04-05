import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';;
import { Subscription, from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/services/alert.service';
import { CustomerAddressListModel, ManageCustomerModel } from '../models/customerModel';
import { CommonMethods } from 'src/app/common/utilities/commonMethods';
import { CustomerMessages } from "../messeges/customerMesseges";


@Component({
    templateUrl:'../html/manageCustomer.html'
})

export class ManageCustomerComponent{
  
    manageCustomerFormGroup:FormGroup;
    subscription:Subscription = new Subscription();
    customerAddressListModelObj:CustomerAddressListModel = new CustomerAddressListModel();
    manageCustomerModelObj:ManageCustomerModel = new ManageCustomerModel();
    commonMethods:CommonMethods = new CommonMethods();
    

    encCustomerID:string;
    countryList: any[];
    custTypelist: any[];
    headersToCpmGridTable: any[];
    dataSourceToCpmGridTable: any;
    addressListArray: Array<any>=[];
    actionsToCpmGridTable: Array<any>;
    id: number = -1;
    togglingButton: string = 'SAVE CUSTOMER';

    constructor(private _fb:FormBuilder, private _router:Router, private _custService:CustomerService, 
                private _actRoute:ActivatedRoute, private _notify:AlertService){
       this.manageCustomerFormGroup = _fb.group({
        customerName:['',[Validators.required]],
        CustomerTypeid: ['',[Validators.required]],
            addreheadersToCpmGridTabless: ['',[Validators.required]],
            country: ['',[Validators.required]],
            stateName: ['',[Validators.required]],
            city: ['',[Validators.required]],
            zip: ['',[Validators.required]],
       }) 
    }

    ngAfterContentInit(){
        
        // this._actRoute.queryParams.subscribe(param => { this.encCustomerID = param['id'] });
        this._custService.getCategoryItems("COUN");
        this._custService.getCategoryItems("CUST");
        this.prepareHeaders();

        if (this.commonMethods.hasValue(this.encCustomerID)) {
            this._custService.viewCustomer(this.encCustomerID);
            this.togglingButton = "UPDATE";
            this.manageCustomerFormGroup.disable();          
        }
       
        this.subscription= this._custService.customerSubject.subscribe(res=>{    
            if (res.purpose == "COUN")
            this.countryList = res.result;
        else if (res.purpose == "CUST")
            this.custTypelist = res.result;

        else if (res.purpose == "viewCustomer") {
            this.form().customerName.setValue(res.result.customerName);
            this.form().CustomerTypeid.setValue(res.result.customerTypeID);
            this.addressListArray = res.result.addressList;
            this.dataSourceToCpmGridTable = new MatTableDataSource(this.commonMethods.increaseSno(this.addressListArray));
            this.prepareHeaders();

            }
            
        if (res.purpose == "manageCustomer") {
            if (res.result == "SUCCESS") {
                this._router.navigate(['/home/searchCustomer']);
                this._notify.success(CustomerMessages.saved);
            }
            else
                this._notify.error(CustomerMessages.notSaved);
            }    
        })
        
        
    }

    form(){
   return    this.manageCustomerFormGroup.controls;
    }

    prepareHeaders(){
        this.headersToCpmGridTable = [];
        this.headersToCpmGridTable.push({ columnDef: 'sno', header: 'sno', cell: (element: any) => `${element.sno}` });
        this.headersToCpmGridTable.push({ columnDef: 'address', header: 'address', cell: (element: any) => `${element.address}` });
        this.headersToCpmGridTable.push({ columnDef: 'countryName', header: 'countryName', cell: (element: any) => `${element.countryName}` });
        this.headersToCpmGridTable.push({ columnDef: 'state', header: 'state', cell: (element: any) => `${element.state}` });
        this.headersToCpmGridTable.push({ columnDef: 'city', header: 'city', cell: (element: any) => `${element.city}` });
        this.headersToCpmGridTable.push({ columnDef: 'zip', header: 'zip', cell: (element: any) => `${element.zip}` });

    }

    addAddress(){

        var errMsg = this.validateAddAddress();

        if (this.commonMethods.hasValue(errMsg))
            return this._notify.warning(errMsg);

        this.customerAddressListModelObj.address = this.form().address.value;
        this.customerAddressListModelObj.country = this.form().country.value;
        this.customerAddressListModelObj.countryName = (this.countryList
            .filter(obj => (obj.catItemID == this.form().country.value)))[0].catItem
        this.customerAddressListModelObj.state = this.form().stateName.value;
        this.customerAddressListModelObj.city = this.form().city.value;
        this.customerAddressListModelObj.zip = this.form().zip.value;

        
        if (this.id == -1) {
            this.addressListArray.push(this.customerAddressListModelObj);
            this.actionsToCpmGridTable = ['Edit', 'Delete'];
        }
        else {
            this.addressListArray[this.id] = this.customerAddressListModelObj;
        }

        this.dataSourceToCpmGridTable = new MatTableDataSource(this.commonMethods.increaseSno(this.addressListArray));
        this.customerAddressListModelObj = new CustomerAddressListModel();

        this.form().address.setValue('');
        this.form().country.setValue('');
        this.form().stateName.setValue('');
        this.form().city.setValue('');
        this.form().zip.setValue('');
        this.id = -1;
        this.prepareHeaders();
    }

    validateAddAddress(){
        if (!this.commonMethods.hasValue(this.form().address.value))
            return CustomerMessages.address;
        if (!this.commonMethods.hasValue(this.form().country.value))
            return CustomerMessages.country;
        if (!this.commonMethods.hasValue(this.form().stateName.value))
            return CustomerMessages.state;
        if (!this.commonMethods.hasValue(this.form().city.value))
            return CustomerMessages.city;
        if (!this.commonMethods.hasValue(this.form().zip.value))
            return CustomerMessages.zip;
        var zipRegex = /^[0-9]{6}$/;
        if (!zipRegex.test(this.form().zip.value))
            return CustomerMessages.OnlyNumbers;
        var checkZip = this.addressListArray.filter(obj => obj.zip == this.form().zip.value);
        if (checkZip.length > 0 && this.id == -1)
            return CustomerMessages.alreadyExists;        
    }

    onActionClickedEventEmmitter(event){
    if (event.action == "Edit") {
        this.id = event.val.sno - 1;
        this.form().address.setValue(event.val.address);
        this.form().country.setValue(event.val.country);
        this.form().stateName.setValue(event.val.state);
        this.form().city.setValue(event.val.city);
        this.form().zip.setValue(event.val.zip);
    }
    else {
        var i = event.val.sno - 1;
        this.addressListArray.splice(i, 1);
        this.dataSourceToCpmGridTable = new MatTableDataSource(this.commonMethods.increaseSno(this.addressListArray));
    }

}



    saveCustomer(){
        if (this.togglingButton == "UPDATE") {
            this.togglingButton = "SAVE CUSTOMER";
            this.manageCustomerFormGroup.enable();
            this.actionsToCpmGridTable = ['Edit', 'Delete'];
            return;
        }
        var errMsg = this.validateSaveCustomer();
        if (this.commonMethods.hasValue(errMsg))
            return this._notify.warning(errMsg);

        this.manageCustomerModelObj.encCustomerID = this.encCustomerID;
        this.manageCustomerModelObj.customerName = this.form().customerName.value;
        this.manageCustomerModelObj.customerType = this.form().CustomerTypeid.value;
        this.manageCustomerModelObj.List = this.dataSourceToCpmGridTable.data;
        this._custService.manageCustomer(this.manageCustomerModelObj);

    }

    validateSaveCustomer(){
        if (!this.commonMethods.hasValue(this.form().customerName.value))
            return CustomerMessages.enterName
        if (!this.commonMethods.hasValue(this.form().CustomerTypeid.value))
            return CustomerMessages.selectType
        if (!this.commonMethods.hasValue(this.dataSourceToCpmGridTable && this.dataSourceToCpmGridTable.data))
            return CustomerMessages.addressColumn
    }


    goBack(){
       return this._router.navigate(['/home/searchCustomer'])
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}