import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { commentsListComponent } from './commentsList.component';
import { commentsListRoutingModule } from './commentsList-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
      commentsListRoutingModule,
      CommonModule,
      NgxPaginationModule
    ],
  declarations: [ commentsListComponent ]
})
export class commentsListModule { }