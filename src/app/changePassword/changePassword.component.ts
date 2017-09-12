import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { TipsService } from '../providers/tipsProvider/tipsProvider';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../providers/tipsProvider/authProvider';

@Component({
  templateUrl: 'changePassword.component.html',
  providers: [Modal]
})
export class changePasswordComponent {
private userData: any;
private data: any;
  constructor(private AllTipsService: TipsService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,private Auth: AuthService){

this.userData = {
  oldPassword: '',
  password: '',
  confirmPassword : ''
};
overlay.defaultViewContainer = vcRef;
  }
  // Local properties

   changePassword(validVal: NgForm){
   if(validVal.valid){
    var a = localStorage.getItem('userData');
    a = JSON.parse(a);
    var b =[];
    b.push(a);
   this.Auth.passwordChange(b[0].id,this.userData)
         .then(
        data => {
          console.log(data);
          this.data = data;
          if (this.data.status != 500) {
            validVal.resetForm();
            // this.userData = {};
            this.change('Your password is changed successfully.');
          } else {
            console.log()
            this.change(JSON.parse(data['_body']).error);
          }        
        });
   }
 }

   change(message){
   this.modal.alert()
        .size('sm')
        .showClose(true)
        .title('Added Tip')
       .body('<p>'+ message +'</p>')
        .open();
  }
}
