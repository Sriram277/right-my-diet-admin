import { NgModule } from '@angular/core';

import { tipsListComponent } from './tipsLists.component';
import { TipsListRoutingModule } from './tipsLists-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

@NgModule({
  imports: [
      TipsListRoutingModule,
      CommonModule,
      FormsModule,
      NgxPaginationModule
    ],
  declarations: [ tipsListComponent ]
})
export class tipsListsModule { }