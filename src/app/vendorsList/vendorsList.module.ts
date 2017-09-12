import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { vendorsListComponent } from './vendorsList.component';
import { vendorsListRoutingModule } from './vendorsList-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
      vendorsListRoutingModule,
      CommonModule,
      NgxPaginationModule
    ],
  declarations: [ vendorsListComponent ]
})
export class vendorsListModule { }