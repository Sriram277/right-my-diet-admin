import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { loginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { emailVerificationComponent } from './emailVerification.component';
import { forgetPasswordComponent } from './forgetPassword.component';
import { resetPasswordComponent } from './reset.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Example Pages'
    },
    children: [
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500'
        }
      },
      {
        path: 'login',
        component: loginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'verify/:verificationId',
        component: emailVerificationComponent,
        data: {
          title: 'verify Page'
        } 
      },
      {
        path: 'forgetpassword',
        component: forgetPasswordComponent,
        data: {
          title: 'forgetPassword Page'
        }
      },
      {
        path: 'resetpassword/:verificationId',
        component: resetPasswordComponent,
        data: {
          title: 'resetPassword Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
