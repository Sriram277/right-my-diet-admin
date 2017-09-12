import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagesRoutingModule} from './pages-routing.module';
// import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';
import { DatePickerModule } from 'ng2-datepicker';
import { SharedAssetsModule } from '../shared-assets/shared-assets.module';

import {P404Component} from './404.component';
import {P500Component} from './500.component';
import {loginComponent} from './login.component';
import {RegisterComponent} from './register.component';

import { emailVerificationComponent } from './emailVerification.component';
import { forgetPasswordComponent } from './forgetPassword.component';
import { resetPasswordComponent } from './reset.component';
import { LoaderComponent } from './loader.component';
@NgModule({
  imports: [PagesRoutingModule, CommonModule,DatePickerModule,
    FormsModule, ReactiveFormsModule, SharedAssetsModule
    // FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
    ],
  declarations: [
    P404Component,
    P500Component,
    loginComponent,
    RegisterComponent,
    emailVerificationComponent,
    forgetPasswordComponent,
    resetPasswordComponent,
    LoaderComponent,
    resetPasswordComponent
  ]
})
export class PagesModule {
}
