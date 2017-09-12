import {NgModule} from '@angular/core';

import {AddCategoryComponent} from './AddCategory.component';
import {AddCategoryRoutingModule} from './AddCategory-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';


@NgModule({
  imports: [
    AddCategoryRoutingModule,
    CommonModule,
    FormsModule,
    // FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  declarations: [AddCategoryComponent]
})
export class AddCategoryModule {
}
