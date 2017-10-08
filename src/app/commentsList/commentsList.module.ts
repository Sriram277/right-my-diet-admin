import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { commentsListComponent } from './commentsList.component';
import { commentsListRoutingModule } from './commentsList-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
      commentsListRoutingModule,
      CommonModule,
      NgxPaginationModule,
      FormsModule
    ],
  declarations: [ commentsListComponent ]
})
export class commentsListModule { }