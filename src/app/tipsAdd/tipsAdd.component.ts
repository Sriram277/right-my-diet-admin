import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { TipsService } from '../providers/tipsProvider/tipsProvider';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  templateUrl: 'tipsAdd.component.html',
  providers: [Modal]
})
export class tipsAddComponent {
  private categories;
  ckeditorContent;
 showLoading = false;
  private tip = {title:'', description:'',images:[], videos:[],category:'',tagsList:'',tags:[], postType:'',genderSpecific:[],videoLink:''};
  private hello;
  public showMe = false;
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

  constructor(private AllTipsService: TipsService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal){
    this.loadCategories();
    overlay.defaultViewContainer = vcRef;
    this.ckeditorContent = '<p>My HTML</p>';
  }
  // Local properties

  loadCategories(){
    // Get all comments
    this.AllTipsService.getCategories()
        .then(
            data => {
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

  saveTip(){
    console.log(this.tip);
    if(this.tip.title === "" || this.tip.description === "" || this.tip.category === ""){
      this.populateError("Please Enter mandatory fields");
    }
    else {      
    
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
     var a = localStorage.getItem('userData');
    a = JSON.parse(a);
    var b =[];
    b.push(a);
    // console.log(b[0].id);
    this.AllTipsService.addTip(this.tip, b[0].id)
        .then(
            data => {
              this.tip = {title:'', description:'', images:[],videos:[], category:'',tagsList:'',tags:[], postType:'',genderSpecific:[], videoLink:''};
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
        .size('lg')
        .showClose(true)
        .title('Added Tip')
        .body(`<p>Your Tip is Added successfully.</p>`)
        .open();
  }
  populateError(message){
    this.modal.alert()
    .size('sm')
    .title('Error in Adding Tip')
    .body('<p>' + message + '</p>')
    .open();
   }
}
