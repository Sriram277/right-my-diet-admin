import { Component ,ViewContainerRef } from '@angular/core';
import {Overlay} from 'angular2-modal';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Router, NavigationExtras} from '@angular/router';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { NGValidators } from 'ng-validators';

import {AuthService} from '../providers/tipsProvider/authProvider';
@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
 private userData: any;
  private data: any;
   date: DateModel;
   theForm;

  options: DatePickerOptions;
    constructor(public router: Router, private Auth: AuthService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private fb: FormBuilder) {
//     this.userData = {
//   "firstName" : "",
//   "lastName" : "",
//   "email" : "",
//   "password" : "",
//   "mobileNumber" : "",
//   "dateofBirth" : "",
//   "gender" : "M",
//   "profilePic" : "",
//   "role" : ""
// };
this.userData = {
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:'',
  mobileNumber:''
};

    overlay.defaultViewContainer = vcRef;
    this.options = new DatePickerOptions();

    //    this.theForm = fb.group({
    //   email: ['', [Validators.required, NGValidators.isEmail()]]
    // });
  }
   register(validVal: NgForm) {
     this.userData.role ='VENDOR';
     let TempData = this.userData;
    //  delete TempData.confirmPassword;
    this.Auth.register(TempData).then( data => {
      this.data = data;
      if(this.data.status === 412) {
        this.errOf('user alredy existed');
      }
      else {     
        console.log(this.userData);
        this.userData = {};
        validVal.resetForm();
        this.createdAccount();
      }
    });
    
  }
  errOf(message){
    this.modal.alert()
      .size('sm')
      .title('register Error')
      .body('<p>'+ message +'</p>')
      .open();
  }
  submitButton(validVal: NgForm){
    console.log(validVal);
    if(validVal.valid){
     this.register(validVal);
    }
  }
      verification() {
        this.router.navigate(['/pages/verify/789777']);
     }

    createdAccount(){
      this.modal.alert()
      .size('sm')
      .showClose(true)
      .title('Added Tip')
      .body(`<p>Your Account is created successfully.We send you a Verification email so we'll know that you are really you.</p>`)
      .open(); 
}
forgetPassword(){
  this.router.navigate(['/pages/forgetpassword']);
}
login(){
  this.router.navigate(['/pages/login']);
}
}


