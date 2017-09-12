import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { TipsService } from '../providers/tipsProvider/tipsProvider';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

declare const CKEDITOR: any;
@Component({
  templateUrl: 'tipsEdit.component.html',
  providers: [Modal]
})
export class tipsEditComponent {
  
  showLoading = false;
  femaleCheck = false;
  maleCheck = false;
  private tipId: any;
  private categories;
  tip: any = {title:'', description:'', images:[],videos:[], category:'',tagsList:'',tags:[], postType:'',genderSpecific:[], videoLink:'',userId:''};
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
    this.loadCategories();
    overlay.defaultViewContainer = vcRef;
    for (let name in CKEDITOR.instances) {
        CKEDITOR.instances[name].destroy(true);
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
        this.tip.videos = b.videos;
        this.tip.category = b.category;
        // this.tip.tagsList = b.tagsList;
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
        if(b.videos.length != 0){
          this.tip.videoLink = "https://www.youtube.com/watch?v=" + b.videos[0];
        }else{
          this.tip.videoLink = '';
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
      this.tip.tags = this.tip.tagsList.split(',');
      delete this.tip.tagsList;
    }

    if(this.tip.videoLink != ''){
      let videoId = this.tip.videoLink.substr(this.tip.videoLink.indexOf("=") + 1);
      let imageId = 'http://img.youtube.com/vi/'+videoId+'/0.jpg';
      this.tip.videos = [];
      this.tip.images = [];
      this.tip.videos.push(videoId);
      this.tip.images.push(imageId);
      delete this.tip.videoLink;
    }
    this.AllTipsService.updateTip(this.tipId,this.tip)
        .then(
            data => {
            //  this.tip = {title:'', description:'', images:[],videos:[], category:'',tagsList:'',tags:[], postType:'',genderSpecific:[], videoLink:''};
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
        this.tip.images.push(data['files'][0].url);
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
}
