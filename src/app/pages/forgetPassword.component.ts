import {Component, ViewContainerRef} from '@angular/core';
import {Overlay} from 'angular2-modal';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Router, NavigationExtras} from '@angular/router';
import { NgForm,FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../providers/tipsProvider/authProvider';

@Component({
  templateUrl: 'forgetPassword.component.html'
})

export class forgetPasswordComponent {
  private data: any;
  private userData:any = {};
  constructor(public router: Router, private Auth: AuthService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    this.userData ={
        email:''
    };
    overlay.defaultViewContainer = vcRef;
 
  }



  submitEmail(message){
    this.modal.alert()
      .size('sm')
      .title('Login Error')
      .body('<p>'+ message +'</p>')
      .open();
  }
  // resetPassword(){
  //      this.router.navigate(['/pages/resetpassword']);
  // }
     resetPassword(validVal: NgForm) {
    let role ='VENDOR';
    if(validVal.valid){
    this.Auth.forgetPassword(role,this.userData)
         .then(
        data => {
          if (this.data.status === 200) {
            this.submitEmail('We sent you a Reset Password link to your Email.');
          } else {
            this.submitEmail('user doesnt exist');
          }
        
        });
  }
     }
     login(){
      this.router.navigate(['/pages/login']);
    }
}
    