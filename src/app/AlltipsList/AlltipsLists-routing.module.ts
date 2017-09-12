import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlltipsListComponent } from './AlltipsLists.component';

const routes: Routes = [
  {
    path: '',
    component: AlltipsListComponent,
    data: {
      title: 'AllTips'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllTipsListRoutingModule {}
