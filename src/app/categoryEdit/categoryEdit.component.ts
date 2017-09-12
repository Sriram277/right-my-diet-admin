
import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { TipsService } from '../providers/tipsProvider/tipsProvider';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'categoryEdit.component.html',
  providers: [Modal]
})
export class CategoryEditComponent {
  private categories;
   private categoryId: any;
  private tip: any = {name:'', imageURL:''};
  private category: any = {};
  private hello;
  showLoading = false;
  public showMe = false;
  constructor(private AllTipsService: TipsService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,private route: ActivatedRoute){
     if(route.params){
       this.categoryId = route.params['_value']['categoryId'];
       console.log(this.categoryId + 'CATEGORY');
    }
    this. loadCategoryDetails();
    overlay.defaultViewContainer = vcRef;
  }
  
    loadCategoryDetails(){
    // Get all comments
    this.AllTipsService.getOneCategory(this.categoryId)
        .then(data => {
        this.category = data;
        console.log(data);
        });
  }

  saveTip(val){
    if(val){
       this.AllTipsService.updateCategory(this.categoryId,this.category)
        .then(
            data => {
              this.categoryPublished();
            }, //Bind to view
            err => {
              // Log errors if any
              console.log(err);
            });

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
         if(this.category.imageURL){
         this.category.imageURL = '';
         this.category.imageURL = (data['files'][0].url);
         this.showLoading = false;
         }
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  categoryPublished(){
   this.modal.alert()
        .size('sm')
        .showClose(true)
        .title('Added Tip')
        .body(`<p>category is edited successfully.</p>`)
        .open();
  }

  
}
