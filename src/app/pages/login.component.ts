import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../providers/tipsProvider/authProvider';

@Component({
  templateUrl: 'login.component.html',
  providers: [Modal]
})

export class loginComponent {
  private userData: any;
  private data: any;
  showSpinner: boolean = false;
  showPage: boolean = true;
  constructor(public router: Router, private Auth: AuthService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    this.userData = { "identifier": "", "password": "" };
    overlay.defaultViewContainer = vcRef;
  }

  login(val) {
    if (val) {
      this.showSpinner = true;
      this.showPage = false;
      this.Auth.login(this.userData)
        .then(
        data => {
          var tempData = [];
          tempData.push(data);
          this.data = data;
          if (this.data.status === 200) {
            this.router.navigate(['/Tips/1/ ']);
            var userInfo = {
              "firstName": tempData[0].user.firstName,
              "id": tempData[0].user.id,
              "lastName": tempData[0].user.lastName,
              "tokenId": tempData[0].user.tokenId,
              "role": tempData[0].user.role
            }
            localStorage.setItem('userData', JSON.stringify(userInfo));
          } else {
            this.showSpinner = false;
            this.showPage = true;
            this.tipPublished('Invalid Login Credentials');
          }

        });
    } else {
      this.tipPublished('Enter Login Credentials');
    }
  }

  Register() {
    this.router.navigate(['/pages/register']);
  }
  tipPublished(message) {
    this.modal.alert()
      .size('sm')
      .title('Login Error')
      .body('<p>' + message + '</p>')
      .open();
  }
 

  forgetPassword() {
    this.router.navigate(['/pages/forgetpassword']);
  }

}
