import { Injectable } from "@angular/core";
import { CpmHttpService } from 'src/app/common/services/cpmHttp.service';
import { Subject } from 'rxjs';
import { LoginServiceUrls } from './loginServiceUrls';
import { LoginModel } from '../model/loginModel';
import { CommonMethods } from 'src/app/common/utilities/commonMethods';

const commonMethods:CommonMethods = new CommonMethods()

@Injectable()

export class LoginService{

    LoginSubject:Subject<any>= new Subject();

    constructor(private _cpmHttpService:CpmHttpService){}

    ValidateLogin(obj:LoginModel){
      this._cpmHttpService.postDataToService(commonMethods.formatString( LoginServiceUrls.ValidLogin, []), obj)
        .subscribe( res=>{
            this.LoginSubject.next({result:res , purpose:"ValidLogin"})
        }

        )
    }
    
}