import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/index';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      },
      {
        path: 'Tips/:page/:search',
        loadChildren: './tipsLists/tipsLists.module#tipsListsModule'
      },
      {
        path: 'AllTips/:page/:search',
        loadChildren: './AlltipsList/AlltipsLists.module#AlltipsListsModule'
      },
      {
        path: 'Categories',
        loadChildren: './categoryList/categoryList.module#categoryListModule'
      },
      {
        path: 'TipsAdd',
        loadChildren: './tipsAdd/tipsAdd.module#tipsAddModule'
      },
      {
        path: 'AddCategory',
        loadChildren: './AddCategory/AddCategory.module#AddCategoryModule'
      },
      {
        path: 'TipsEdit/:tipId',
        loadChildren: './tipsEdit/tipsEdit.module#tipsEditModule'
      },
      {
        path: 'CategoryEdit/:categoryId',
        loadChildren: './categoryEdit/categoryEdit.module#categoryEditModule'
      },
      {
        path: 'TipsDeleted',
        loadChildren: './tipsDeleted/tipsDeleted.module#tipsDeletedModule'
      },
        {
        path: 'Details',
        loadChildren: './Details/Details.module#DetailsModule'
      },
      {
       path: 'changePassword',
        loadChildren: './changePassword/changePassword.module#changePasswordModule'
      },
      {
       path: 'vendorsList/:page',
        loadChildren: './vendorsList/vendorsList.module#vendorsListModule'
      },

      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
