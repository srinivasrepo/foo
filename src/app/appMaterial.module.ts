import { NgModule } from "@angular/core";

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    imports:[MatCardModule,
             MatInputModule,
             MatButtonModule,
             MatSidenavModule,
             MatToolbarModule,
             MatSelectModule,
             MatTableModule,
             MatIconModule,
             MatMenuModule,
             MatTooltipModule,
            ]
             ,
    exports:[MatCardModule,
            MatInputModule,
            MatButtonModule,
            MatSidenavModule,
            MatToolbarModule,
            MatSelectModule,
            MatTableModule,
            MatIconModule,
            MatMenuModule,
            MatTooltipModule,
            ]
})

export class AppMaterialModule{

}