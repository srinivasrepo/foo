import { NgModule } from "@angular/core";
import { CpmGridTableComponent } from './cpmGridTable.component';
import { AppMaterialModule } from 'src/app/appMaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[CpmGridTableComponent],
    imports:[AppMaterialModule,
             FormsModule,
             ReactiveFormsModule,
             CommonModule
            ],
    providers:[],
    exports:[CpmGridTableComponent]
})

export class CpmHelpersModule{

}