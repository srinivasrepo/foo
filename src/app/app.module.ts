import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentModule } from './environment/environment.module';
import { LoginModule } from './login/component/login.module';
import { CpmHttpService } from './common/services/cpmHttp.service';
import { AlertService } from './common/services/alert.service';
import { NotifierModule } from "angular-notifier";
import { AppMaterialModule } from './appMaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EnvironmentModule,
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    NotifierModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [CpmHttpService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
