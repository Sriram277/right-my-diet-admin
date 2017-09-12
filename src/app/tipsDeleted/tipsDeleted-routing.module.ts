import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { tipsDeletedComponent } from './tipsDeleted.component';

const routes: Routes = [
  {
    path: '',
    component: tipsDeletedComponent,
    data: {
      title: 'TipsDeleted'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipsDeletedRoutingModule {}
