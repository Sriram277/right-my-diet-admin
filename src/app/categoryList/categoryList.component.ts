import { Component, ViewContainerRef } from '@angular/core';
import {TipsService} from '../providers/tipsProvider/tipsProvider';
import { Router, ActivatedRoute } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';


@Component({
  templateUrl: 'categoryList.component.html'
})
export class categoryListComponent {
  public Categories;
  public tips;
  itemsPPage = 10;
  curPage = '1';
  constructor(public tipsService: TipsService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    this.loadCategories();
    overlay.defaultViewContainer = vcRef;
  }

  loadCategories() {
    this.tipsService.getCategories()
      .then(data => {
      
        this.Categories = data;
      });
  }

  tipPublished(){
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('Added Tip')
      .body(`<p>Your Tip is published successfully</p>`)
      .open();
  }

    DelCategory(category) {
      console.log(category);

    // var confirmed = confirm("Are you sure to delete?");
    if(category.count == 0){
         this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Added Tip')
        .body(`<p>Category is deleted successfully.</p>`)
        .open();
      this.tipsService.deleteCategory(category.id)
        .then(
          data => {
            this.Categories.splice(this.Categories.indexOf(category),1);
            console.log(data);
          }, //Bind to view
          err => {
            // Log errors if any
            console.log(err);
          });
    }
    else{
      this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Added Tip')
        .body(`<p>Category cannot be deleted, As it has some Tips added.</p>`)
        .open();
    }

  }

    pagination(i,p){
    
    return ((Number(this.curPage)- 1)*this.itemsPPage)+i+1;
  }

}
