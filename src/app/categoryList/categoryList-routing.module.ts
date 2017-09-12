import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { categoryListComponent } from './categoryList.component';

const routes: Routes = [
  {
    path: '',
    component: categoryListComponent,
    data: {
      title: 'Tips'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class categoryistRoutingModule {}
