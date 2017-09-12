import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { tipsEditComponent } from './tipsEdit.component';


const routes: Routes = [
  {
    path: '',
    component: tipsEditComponent,
    data: {
      title: 'TipsEdit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipsEditRoutingModule {}
