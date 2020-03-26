import { Component } from "@angular/core";
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginModel } from '../model/loginModel';
import { Subscription, from } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoginMessages } from '../messages/loginMessages';
import { CommonMethods } from 'src/app/common/utilities/commonMethods';


@Component({
    templateUrl:'../html/login.html'
})




export class LoginComponent{

    array:[''];
 LoginFormGroup:FormGroup;
 LoginModelClassObj:LoginModel = new LoginModel();
 subscription:Subscription = new Subscription();
 commonMethods:CommonMethods= new CommonMethods();
    
 constructor(private _loginService:LoginService,private _fb:FormBuilder, private _router:Router, private _notify:AlertService ){
     this.LoginFormGroup=_fb.group({
        usernameFCN:[''],
        passwordFCN:['']
     })
 }

 ngAfterContentInit(){
    this.subscription = this._loginService.LoginSubject.subscribe(res=>{
        if(res.purpose == "ValidLogin"){
            if(res.result.retCode == "OK"){
               this._router.navigate(['/home']);
               this._notify.success(LoginMessages.loginSuccessfull);
                             
               
            }
            else {
                this._notify.error(LoginMessages.loginFailed);
                this.LoginFormGroup.reset();
            }
                        
        }
    })
 }


  formGroupShortcut(){
   return this.LoginFormGroup.controls
  }

login(){
    
    var loginFormError=this.validateLoginForm(this.formGroupShortcut()) ;
    if(loginFormError){ 
    this._notify.warning(loginFormError);
   
    // for returning multiple lines in js or ts
    // this.LoginFormGroup.reset(); 
    return;
    // or
    // return stmt1, stmnt2;
    // or 
    //return method_name(){stmt1; stmnt2}; and returns & executes statements in that function only.
    }  

    this.LoginModelClassObj.userName=this.formGroupShortcut().usernameFCN.value;
    this.LoginModelClassObj.password=this.formGroupShortcut().passwordFCN.value;

    this._loginService.ValidateLogin(this.LoginModelClassObj)
}
 
validateLoginForm(element:any){
 
    if(!this.commonMethods.hasValue(element.usernameFCN.value)){ 
        return LoginMessages.usernameEmpty;
    }
    if(!this.commonMethods.hasValue(element.passwordFCN.value)){
        return LoginMessages.passwordEmpty;
    }

    
}

ngOnDestroy(){
    this.subscription.unsubscribe();
}

}