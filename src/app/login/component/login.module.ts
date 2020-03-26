import { NgModule } from "@angular/core";
import { LoginComponent } from './login.component';
import { LoginService } from '../services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/appMaterial.module';

@NgModule({
   declarations:[LoginComponent],
   imports:[AppMaterialModule,
            BrowserModule,
            FormsModule,
            CommonModule,
            ReactiveFormsModule
   
         ],
   providers:[LoginService]
})

export class LoginModule{

}