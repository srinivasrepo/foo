export class CommonMethods{

 
  sno:number;
  headersArray:Array<any>=[];


//<!---- Since emptyString:  "" != undefined && "" !=null _________ therefore "" == defined and "" == notnull ----------->
    hasValue(element_value:any){
       if(
         element_value !="" && 
         element_value != undefined && element_value !=null && 
         element_value != "undefined" && element_value !="null" && 
         `${element_value}`.trim() !="" && element_value !=0
       ){
         return  true
        }
        
       else false
    }


// str.replace() method replaces something only when the first aurgument whole string is present in str.
    formatString(path:string, queryValuesArray:Array<string>):string{
      queryValuesArray.forEach((element,index)=>{
       path = path.replace('{' + index.toString() + '}', element)
      });
      
      return path;
    }
    

// object.key=value  === adds a key:value pair in that object & ...Array spreds that array
  increaseSno(Array:any[]){     
       this.headersArray=[];
       Array.map((obj,index)=>{
          obj.sno = index + 1;        
          this.headersArray = [...this.headersArray, obj] 
       })
       return this.headersArray ;   
/* or  */    
      Array.forEach((obj, index)=>{
        Array[index].sno = index + 1;
      })
      return Array       
/* */
  }    
}