import {NgModule} from '@angular/core';

import {tipsAddComponent} from './tipsAdd.component';
import {TipsAddRoutingModule} from './tipsAdd-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    TipsAddRoutingModule,
    CommonModule,
    FormsModule,
    // FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    CKEditorModule
  ],
  declarations: [tipsAddComponent]
})
export class tipsAddModule {
}
