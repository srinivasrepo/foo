import { Injectable } from "@angular/core";
import { CpmHttpService } from 'src/app/common/services/cpmHttp.service';
import { Subject, from } from 'rxjs';
import { CommonMethods } from 'src/app/common/utilities/commonMethods';

@Injectable()

export class ProductService{

    productSubject:Subject<any> = new Subject();

    commonMethods: CommonMethods = new CommonMethods();

    constructor(private _cpmHttpServiece:CpmHttpService){}
    
    getStatusDetails(path:string,queryParamValue:any){
        this._cpmHttpServiece.getDataFromService(this.commonMethods.formatString(path, [queryParamValue]))
          .subscribe(response =>{
               this.productSubject.next({ result:response, purpose:"getStatusDetails"})
          })
    }

    searchProduct(path:string, bodyObject:any){
        this._cpmHttpServiece.postDataToService(this.commonMethods.formatString(path, []), bodyObject)
         .subscribe(response =>{
             this.productSubject.next({ result:response, purpose:"searchProduct"})
         })
    }
}