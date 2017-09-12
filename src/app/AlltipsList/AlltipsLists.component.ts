import { Component, ViewContainerRef } from '@angular/core';
import {TipsService} from '../providers/tipsProvider/tipsProvider';
import { Router, ActivatedRoute } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
  templateUrl: 'AlltipsLists.component.html'
})

export class AlltipsListComponent {
  public tips;
  itemsPPage = 10;
  curPage = '1';
  Categories:any = [];
  categoryIdVal:any = "all";
  searchText = '';
  public abc;
 
  constructor(public tipsService: TipsService, public router: Router, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,private route: ActivatedRoute) {
    overlay.defaultViewContainer = vcRef;
    this.curPage = route.params['_value']['page'];
    this.searchText = route.params['_value']['search'];
    this.loadCategories();
    var a = localStorage.getItem('userData');
     this.abc = JSON.parse(a);

  
    // this.changePage(this.curPage);
    if(this.searchText != ''){
      this.searchTips(this.searchText);
      
    }else{
      this.loadTips();
    }
  }
  clearSearch(){
    this.searchText = '';
    this.router.navigate(['/AllTips/'+this.curPage+'/ ']);
    this.loadTips();    
  }

  
  searchTips(searchTerm){
    this.router.navigate(['/AllTips/'+this.curPage+'/'+searchTerm]);
     var a = localStorage.getItem('userData');
    a = JSON.parse(a);
    var b =[];
    b.push(a);
    let c =  b[0].id;
    if(searchTerm != ''){
    this.tipsService.searchTipsAll(searchTerm, this.categoryIdVal)
      .then(
        data => {   
          let g:any = data;
          let b:any =[];          
          g.forEach(element => {
            if(element.userId != c){
               b.push(element);
            }
          });   
          this.tips = b;
        }, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
    } else {
       this.router.navigate(['/AllTips/'+this.curPage+'/ ']);
       this.loadTips();
    }
  }
  loadCategories() {
    this.tipsService.getCategories()
      .then(data => {      
        this.Categories = data;
      });
    }
  loadTips() {
     var a = localStorage.getItem('userData');
    a = JSON.parse(a);
    console.log(a)
    var b =[];
    b.push(a);
    console.log(b[0].id + 'LOAD');
    this.tipsService.allTips(b[0].id)
      .then(data => {
        this.tips = data;
      });
  }
  removeTip(tip) {
    var confirmed = confirm("Are you sure to delete?");
    if(confirmed){
      this.tipsService.deleteTip(tip.id)
        .then(
          data => {
            this.tips.splice(this.tips.indexOf(tip),1);
          }, //Bind to view
          err => {
            // Log errors if any
            console.log(err);
          });
    }

  }
  makePublish(tip){
    this.tipsService.makePublish(tip.id)
      .then(
        data => {
          this.tips[this.tips.indexOf(tip)].status = 'ACTIVE';
          this.tipPublished();
        }, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

    hideRole(role){

    var a = localStorage.getItem('userData');

    a = JSON.parse(a);
    var b =[];
    b.push(a);
    if(b[0].role[0] == role){
      return false;
    }
    else{
      return true;
    }
  }
  tipPublished(){
    this.modal.alert()
      .size('sm')
      .showClose(true)
      .title('Added Tip')
      .body(`<p>Your Tip is published successfully</p>`)
      .open();
  }
  pagination(i,p){    
    return ((Number(this.curPage)- 1)*this.itemsPPage)+i+1;
  }

  changePage(event){
    this.router.navigate(['/AllTips/'+event]);
    this.curPage = event;
  }
}
