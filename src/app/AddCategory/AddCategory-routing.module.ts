import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './AddCategory.component';


const routes: Routes = [
  {
    path: '',
    component: AddCategoryComponent,
    data: {
      title: 'AddCategory'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCategoryRoutingModule {}
