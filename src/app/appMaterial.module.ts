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
            ]
})

export class AppMaterialModule{

}