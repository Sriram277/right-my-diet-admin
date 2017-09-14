import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vendorsListComponent } from './vendorsList.component';

const routes: Routes = [
  {
    path: '',
    component: vendorsListComponent,
    data: {
      title: 'Articles'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class vendorsListRoutingModule {}
