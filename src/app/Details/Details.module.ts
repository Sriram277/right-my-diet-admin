import {NgModule} from '@angular/core';

import {DetailsComponent} from './Details.component';
import {DetailsRoutingModule} from './Details-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';


@NgModule({
  imports: [
    DetailsRoutingModule,
    CommonModule,
    FormsModule,
    // FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  declarations: [DetailsComponent]
})
export class DetailsModule {
}
