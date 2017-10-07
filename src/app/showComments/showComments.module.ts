import { NgModule } from '@angular/core';

import {ShowCommentsComponent} from './showComments.component';
import {ShowCommentsRoutingModule} from './showComments-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';
import { CKEditorModule } from 'ng2-ckeditor';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@NgModule({
  imports: [
    ShowCommentsRoutingModule,
      CommonModule,
      FormsModule,
      //  FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
       CKEditorModule,
       NgxPaginationModule
    ],
  declarations: [ ShowCommentsComponent ]
})
export class showCommentsModule { }
