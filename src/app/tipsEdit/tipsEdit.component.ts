import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TipsService } from '../providers/tipsProvider/tipsProvider';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

declare const CKEDITOR: any;
@Component({
  templateUrl: 'tipsEdit.component.html',
  providers: [Modal]
})
export class tipsEditComponent {
  
  private requestAutocompleteItems;
  showLoading = false;
  femaleCheck = false;
  maleCheck = false;
  private tipId: any;
  private categories;
  tip: any = {title:'', description:'', images:[], category:'',tagsList:[],tags:[], postType:'',genderSpecific:[],userId:'',gridDescription:''};
    public config = {toolbarGroups:[
        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'links' },
        { name: 'insert',    groups: ['Image']  },
        { name: 'forms' },
        { name: 'tools' },
        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'others' },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'styles' },
        { name: 'colors' },
        { name: 'about' }
    ],
    removeDialogTabs:'image:advanced;link:advanced'
  };
 
  constructor(private AllTipsService: TipsService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,private route: ActivatedRoute){
    if(route.params){
       this.tipId = route.params['_value']['tipId'];
    }
    this.loadTipDetails();
    this.getAutocompleteTags();
    this.loadCategories();
    for (let name in CKEDITOR.instances) {
        CKEDITOR.instances[name].destroy(true);
        //CKEDITOR.remove(CKEDITOR.instances[name]);
    }
  }
  // Local properties

  loadTipDetails(){
    // Get all comments
    this.AllTipsService.getOneTip(this.tipId)
        .then(data => {
          let b:any = data;
        this.tip.title = b.title;
        this.tip.description = b.description;
        this.tip.images = b.images;
        this.tip.gridDescription = b.gridDescription;
        this.tip.category = b.category;
        this.tip.tagsList = b.tagsList;
        this.tip.tags = b.tags;
        this.tip.postType = b.postType;
        this.tip.postType = b.postType;
        if(b.genderSpecific){
          this.tip.genderSpecific = b.genderSpecific;
          if(b.genderSpecific.length==2){
            this.femaleCheck = true;
            this.maleCheck = true;
          }else if(b.genderSpecific.length==1 && b.genderSpecific[0]=='male'){
            this.maleCheck = true;
          }else if(b.genderSpecific.length==1 && b.genderSpecific[0]=='female'){
            this.femaleCheck = true;
          }
        }else{
        this.tip.genderSpecific = [];  
        }
       
        this.tip.userId = b.userId;
        console.log(b);
        });
  }
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

  setGender(value, event){
    if(event.target.checked){
      this.tip.genderSpecific.push(value);
    }else{
      this.tip.genderSpecific.splice(this.tip.genderSpecific.indexOf(value),1);
     }
  }

  updateTip(val){
    if(val){
    if(this.tip.tagsList){
      //this.tip.tags = this.tip.tagsList.split(',');
      //delete this.tip.tagsList;
     if(this.tip.tagsList){
      for(let i=0;i<this.tip.tagsList.length;i++) {
        this.tip.tags[i] = this.tip.tagsList[i].value;
      }
    }
    }

    this.AllTipsService.updateTip(this.tipId,this.tip)
        .then(
            data => {
            //  this.tip = {title:'', description:'', images:[],videos:[], category:'',tagsList:[],tags:[], postType:'',genderSpecific:[], videoLink:'', gridDescription:''};
              this.tipPublished();
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
        this.tip.images = [];
        //this.tip.images.push(data['files'][0].url);
        this.tip.images.push(data['fileUrl']);
        this.showLoading = false;
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  tipPublished(){
   this.modal.alert()
        .size('sm')
        .showClose(true)
        .title('Added Tip')
        .body(`<p>Your Tip is updated successfully</p>`)
        .open();
  }

    /* Get auto completed strings*/
   getAutocompleteTags() {
       this.AllTipsService.getsearchItems()
        .then(
            data => {
              //this.searchItems = data
              this.requestAutocompleteItems = data
            }, //Bind to view
            err => {
              // Log errors if any
              console.log(err);
            });
   
   }
}
