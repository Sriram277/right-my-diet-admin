import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryEditComponent } from './categoryEdit.component';


const routes: Routes = [
  {
    path: '',
    component: CategoryEditComponent,
    data: {
      title: 'CategoryEdit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class CategoryEditRoutingModule {}
