import { Injectable } from "@angular/core";
import { CpmHttpService } from 'src/app/common/services/cpmHttp.service';
import { CommonMethods } from 'src/app/common/utilities/commonMethods';
import { Subject, Observable } from 'rxjs';
import { CustomerServiceUrls } from './customerServiceUrls';

@Injectable()

export class CustomerService{
     
    commonMethods:CommonMethods = new CommonMethods();

    constructor(private _cpmHttpService:CpmHttpService){}
    customerSubject:Subject<any> = new Subject();

    getStatusDetails(code:string){
       this._cpmHttpService.getDataFromService(this.commonMethods.formatString(CustomerServiceUrls.getStatusDetails, [code]))
         .subscribe(response=>{
            this.customerSubject.next({result:response, purpose:"getStatusDetails"})
         })
    }
    
    getCategoryItems(code:string){
        this._cpmHttpService.getDataFromService(this.commonMethods.formatString(CustomerServiceUrls.getCategoryCode, [code]))
           .subscribe(res=>{
               this.customerSubject.next({result:res, purpose:code})
           })
    }

    searchCustomer(object:object){
        this._cpmHttpService.postDataToService(this.commonMethods.formatString(CustomerServiceUrls.searchCustomer, []),object)
           .subscribe(res=>{
               this.customerSubject.next({result:res, purpose:"searchCustomer"})
           })
    }

    changeStatus(object:object){
       this._cpmHttpService.postDataToService(this.commonMethods.formatString(CustomerServiceUrls.changeStatus, []), object)
        .subscribe(res=>{
            this.customerSubject.next({result:res, purpose:"changeStatus"})
        })
    }
    viewCustomer(code:string){
       this._cpmHttpService.getDataFromService(this.commonMethods.formatString(CustomerServiceUrls.viewCustomer, [code]))
         .subscribe(res=>{
             this.customerSubject.next({result:res, purpose:"viewCustomer"})
         })
    }

    manageCustomer(object:object){
      this._cpmHttpService.postDataToService(this.commonMethods.formatString(CustomerServiceUrls.manageCustomer, []), object)
        .subscribe(res=>{
            this.customerSubject.next({result:res, purpose:"manageCustomer"})
        })
    }
}