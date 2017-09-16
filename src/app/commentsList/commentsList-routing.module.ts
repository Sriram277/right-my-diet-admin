import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { commentsListComponent } from './commentsList.component';


const routes: Routes = [
  {
    path: '',
    component: commentsListComponent,
    data: {
      title: 'Comments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class commentsListRoutingModule {}