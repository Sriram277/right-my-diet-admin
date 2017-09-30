import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { TipsService } from '../providers/tipsProvider/tipsProvider';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'tipsAdd.component.html',
  providers: [Modal]
})
export class tipsAddComponent {
  private categories;
  ckeditorContent;
 showLoading = false;
  private tip = {title:'', description:'',images:[],category:'',tagsList:[],tags:[], postType:'',coverBlog: false, gridDescription:''};
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

  constructor(private AllTipsService: TipsService,overlay: Overlay, public modal: Modal, public http: Http){
    this.loadCategories();
    this.getAutocompleteTags();
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

  /* Get auto completed strings*/
   getAutocompleteTags() {
   
   }

  /* Get auto completed strings*/

  // setGender(value, event){
  //   if(event.target.checked){
  //     this.tip.genderSpecific.push(value);
  //   }else{
  //     this.tip.genderSpecific.splice(this.tip.genderSpecific.indexOf(value),1);
  //    }
  // }

  saveTip(){
    console.log(this.tip);
    if(this.tip.title === "" || this.tip.description === "" || this.tip.category === "" || this.tip.gridDescription ===""){
      this.populateError("Please Enter mandatory fields");
    }
    else {      
    if(this.tip.tagsList){
      //this.tip.tags = this.tip.tagsList.split(',');
      //delete this.tip.tagsList;
      for(let i=0;i<this.tip.tagsList.length;i++) {
        this.tip.tags[i] = this.tip.tagsList[i].value;
      }
      //return this.items;
      //this.tip.tags = this.tip.tagsList
    }
     var a = localStorage.getItem('userData');
    a = JSON.parse(a);
    var b =[];
    b.push(a);
    // console.log(b[0].id);
/*    if(this.tip.coverBlog==""){
    this.tip.coverBlog = "false";
    }*/
    this.AllTipsService.addTip(this.tip, b[0].id)
        .then(
            data => {
              this.tip = {title:'', description:'', images:[], category:'',tagsList:[],tags:[], postType:'', coverBlog: false, gridDescription:''};
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
        .title('Added Article')
        .body(`<p>Your Article is Added successfully.</p>`)
        .open();
  }
  populateError(message){
    this.modal.alert()
    .size('sm')
    .title('Error in Adding Article')
    .body('<p>' + message + '</p>')
    .open();
   }

/*   public requestAutocompleteItems = (text: string): Observable<Response> => {
    const url = `https://right-my-diet.herokuapp.com/tags/search/{text}`;
    return this.http
        .get(url)
        .map(data => data.json());
};*/


 public requestAutocompleteItems = [{value: 0, display: 'Fitness'}, {value: 1, display: 'Beauty'}, {value: 2, display: 'Health'}, {value: 3, display: 'Sample'}];
}
