import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { categoryListComponent } from './categoryList.component';
import { categoryistRoutingModule } from './categoryList-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
      categoryistRoutingModule,
      CommonModule,
      NgxPaginationModule
    ],
  declarations: [ categoryListComponent ]
})
export class categoryListModule { }