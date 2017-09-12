import { NgModule } from '@angular/core';

import {CategoryEditComponent} from './categoryEdit.component';
import {CategoryEditRoutingModule} from './categoryEdit-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  imports: [
    CategoryEditRoutingModule,
      CommonModule,
      FormsModule,
      //  FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
       CKEditorModule
    ],
  declarations: [ CategoryEditComponent ]
})
export class categoryEditModule { }
