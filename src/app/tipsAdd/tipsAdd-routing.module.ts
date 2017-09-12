import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { tipsAddComponent } from './tipsAdd.component';


const routes: Routes = [
  {
    path: '',
    component: tipsAddComponent,
    data: {
      title: 'TipsAdd'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipsAddRoutingModule {}
