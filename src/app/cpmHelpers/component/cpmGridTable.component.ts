import { Component, Input } from "@angular/core";

@Component({
    selector:'cpmGridTable',
    templateUrl:'../html/cpmGridTable.html'
})

export class CpmGridTableComponent{

    @Input() headersToCpmGridTable:any[];
    @Input() dataSourceToCpmGridTable : any[];
    @Input() actionsToCpmGridTable:string[];

    displayedColumns:any[]=[];
    dataSource:any[];
    matIcons:Map<string, string> = new Map();
    arrayOfMatIcons:any;


    constructor(){
//we can't iterate object nor give (key & value) pair in array, therefore use Map    
//In Array we itirate array of objects if we have a common key in each object & access all by itiration loop
//We can itirate Object using "for in " or by using "KeyValue_Pipe with for of "
//So, Map<key, value> Data Structure (an ASSOCIATE ARRAY just like hash table or dictionary)can itirate group of key-value_pairs with different keys (Map.prototyoe.keys())        
        
    this.matIcons.set("View","visibility");
    this.matIcons.set("ChangeStatus","swap_horiz");
    this.matIcons.set("Edit","edit");
    this.arrayOfMatIcons=["View", "ChangeStatus", "Edit" ];
            }

    ngOnChanges(){

        if(this.dataSourceToCpmGridTable != null){
                       
// from full_headersObject to only_headers for ColumnDef 
            this.displayedColumns = this.headersToCpmGridTable.map(a=>a.ColumnDef);
            this.displayedColumns = this.displayedColumns.concat("actions");
            // or array.push("a")

for(let foo of this.matIcons.keys()){
    console.log(foo);
    
}
            

            
        }   
    }


    

}