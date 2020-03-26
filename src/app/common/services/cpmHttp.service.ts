import { Injectable } from "@angular/core";
import {  HttpClient, HttpHeaders } from "@angular/common/http" ;
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonMethods } from '../utilities/commonMethods';


@Injectable()

export class CpmHttpService{

    observable:Observable<any>;
    
    commonMethods:CommonMethods = new CommonMethods();

    constructor(private _httpClient:HttpClient){}

    

    getDataFromService(path:string , headers:HttpHeaders=null, isLocalFileAccessingBool:boolean=false):Observable<any>{
        this.observable = this._httpClient.get(this.getUrl(path,  isLocalFileAccessingBool), {headers:headers});
        return this.observable;
    }
    
    getUrl(path:string, bool:boolean){

       if(!bool){
        // let finalPath = this.commonMethods.formatString(path, queryparamValue);
        let uri = environment.baseUrl + path;
        return uri;
       } 
      
      
    }

    postDataToService(path:string, body:any, headers:HttpHeaders=null):Observable<any>{
       this.observable= this._httpClient.post(environment.baseUrl + path, body, {headers:headers});
        return this.observable;

        }
          
}


    
