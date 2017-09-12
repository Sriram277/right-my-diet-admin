import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { tipsListComponent } from './tipsLists.component';

const routes: Routes = [
  {
    path: '',
    component: tipsListComponent,
    data: {
      title: 'Tips'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipsListRoutingModule {}
