import { Component, Input, Output, EventEmitter } from "@angular/core";


@Component({
    selector:'cpmGridTable',
    templateUrl:'../html/cpmGridTable.html'
})

export class CpmGridTableComponent{

    @Input() headersToCpmGridTable:any[];
    @Input() dataSourceToCpmGridTable : any[];
    @Input() actionsToCpmGridTable:string[];
    @Output() onActionClickedEventEmmitter: EventEmitter<any> = new EventEmitter();

    displayedColumns:any[]=[];
    dataSource:any[];
    actionIcons:Map<string, string> = new Map();
    actionIconTooltip:Map<string, string> = new Map();
    // filteredArrayForActionIcons=["View", "ChangeStatus", "Edit" ];
    filteredArrayForInActiveActionIcons=["View", "ChangeStatus"]      


    constructor(){
    //we can't iterate object nor give (key & value) pair in array, therefore use Map    
    //In Array we itirate array of objects if we have a common key in each object & access all by itiration loop
    //We can itirate Object using "for in " or by using "KeyValue_Pipe with for of "
    //So, Map<key, value> Data Structure (an ASSOCIATE ARRAY just like hash table or dictionary)can itirate group of key-value_pairs with different keys (Map.prototyoe.keys())        
        
    this.actionIcons.set("View", "visibility");
    this.actionIcons.set("ChangeStatus", "swap_horiz");
    this.actionIcons.set("Edit", "edit");
    this.actionIcons.set("AssignProducts", "assignment");

    this.actionIconTooltip.set("View", "View")
    this.actionIconTooltip.set("ChangeStatus", "Change Status");
    this.actionIconTooltip.set("Edit", "Edit");
    this.actionIconTooltip.set("AssignProducts", "Assign Products");
    }

    ngOnChanges(){

        if(this.actionsToCpmGridTable != null){                       
           // from full_headersObject to only_headers for ColumnDef 
            this.displayedColumns = this.headersToCpmGridTable.map(a=>a.ColumnDef);
            this.displayedColumns = this.displayedColumns.concat("actions");
            // or array.push("a")   
        }
        else{
            this.displayedColumns = this.headersToCpmGridTable.map(a=>a.ColumnDef);
        }         
          
    }

    filteredActions(row){
        if(row.status == "In-Active"){
          return this.filteredArrayForInActiveActionIcons
        }
        return this.actionsToCpmGridTable
    }


    onActionClick(key:string, row:object){
        this.onActionClickedEventEmmitter.emit({action:key, ProductRow:row})
    }
    

}