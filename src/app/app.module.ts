import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
// import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CKEditorModule,CKEditorComponent  } from 'ng2-ckeditor';
import { DatePickerModule } from 'ng2-datepicker';
// import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './_guards/index';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { TipsService } from './providers/tipsProvider/tipsProvider';
import { AuthService } from './providers/tipsProvider/authProvider';
import { globalService } from './providers/tipsProvider/globalService';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    HttpModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    CKEditorModule,
    // FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    NgxPaginationModule,
    DatePickerModule,
    
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    //tipsListComponent
    AsideToggleDirective,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    TipsService,
    AuthService,
    globalService,
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
