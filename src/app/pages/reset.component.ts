import {Component, ViewContainerRef} from '@angular/core';
import {Overlay} from 'angular2-modal';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Router, NavigationExtras} from '@angular/router';
import { NgForm,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../providers/tipsProvider/authProvider';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'reset.component.html'
})

export class resetPasswordComponent {
  private userData:any = {};
  private verificationId ="";
  constructor(public router: Router, private Auth: AuthService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,private route: ActivatedRoute) {
    overlay.defaultViewContainer = vcRef;
        this.userData ={
            password:"",
            confirmPassword: ""
      }

      if(route.params){
      this.verificationId = route.params['_value']['verificationId'];
      this.Auth.resetPassword( this.verificationId);
      console.log(this.verificationId);
    }
  };
  
 changePassword(validVal: NgForm){
   if(validVal.valid){
   this.Auth.changePassword(this.verificationId,this.userData);
   this.userData ={};
   this.reset();
   }
 }

   reset(){
   this.modal.alert()
        .size('sm')
        .showClose(true)
        .title('Added Tip')
        .body(`<p>Your password is Reset successfully.</p>`)
        .open();
  }
  
  }

