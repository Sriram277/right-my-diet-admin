import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { TipsService } from '../providers/tipsProvider/tipsProvider';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


@Component({
  templateUrl: 'AddCategory.component.html',
  providers: [Modal]
})
export class AddCategoryComponent {
  private categories;
  private tip = {name:'', imageURL:''};
  private hello;
  showLoading = false;
  public showMe = false;
  constructor(private AllTipsService: TipsService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal){
    this.loadCategories();
    overlay.defaultViewContainer = vcRef;
  }
  // Local properties

  loadCategories(){
    // Get all comments
    this.AllTipsService.getCategories()
        .then(
            data => {
              console.log(data);
              this.categories = data
            }, //Bind to view
            err => {
              // Log errors if any
              console.log(err);
            });
  }



  saveTip(){
    if(this.tip.imageURL!= ''){
    this.AllTipsService.AddCategory(this.tip)
        .then(
            data => {
              this.tip = {name:'', imageURL:''};
              this.tipPublished('Your Category is saved successfully. You can now add tips to this Category.');
            }, //Bind to view
            err => {
              // Log errors if any
              console.log(err);
            });
    } else {
      this.tipPublished('Please uplaod an image to Add Category');
    }
  }
  myfile:any;
  fileChange(fileInput: any) {
    this.showLoading = true;
    this.myfile = fileInput.target.files[0];
    //let fileList: FileList = event.target.files;
      this.AllTipsService.fileUpload(this.myfile)
      .then(data => {
        //console.log(data);
        this.tip.imageURL = '';
        this.tip.imageURL = (data['files'][0].url);
         this.showLoading = false;
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  tipPublished(msg){
   this.modal.alert()
        .size('sm')
        .showClose(true)
        .title('Added Tip')
        .body('<p>'+msg+'</p>')
        .open();
  }


  
}
