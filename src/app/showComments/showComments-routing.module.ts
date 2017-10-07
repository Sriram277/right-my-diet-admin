import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowCommentsComponent } from './showComments.component';


const routes: Routes = [
  {
    path: '',
    component: ShowCommentsComponent,
    data: {
      title: 'ShowComments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class ShowCommentsRoutingModule {}
