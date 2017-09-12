import { Component } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor/src/ckeditor.component';
import { NgModule } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
@NgModule({
    declarations: [
        CKEditorComponent
    ],
    exports: [
        CKEditorComponent,
           ]
})
export class AppComponent { }
