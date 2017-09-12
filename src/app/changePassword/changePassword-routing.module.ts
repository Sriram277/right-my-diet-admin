import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { changePasswordComponent } from './changePassword.component';


const routes: Routes = [
  {
    path: '',
    component: changePasswordComponent,
    data: {
      title: 'changePassword'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class changePasswordRoutingModule {}
