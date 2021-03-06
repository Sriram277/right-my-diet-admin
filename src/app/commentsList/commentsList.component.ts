import { Component, ViewContainerRef } from '@angular/core';
import {TipsService} from '../providers/tipsProvider/tipsProvider';
import { Router, ActivatedRoute } from '@angular/router';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
  templateUrl: 'commentsList.component.html'
})
export class commentsListComponent {
  public Comments;
  private articleId: any;
  private searchText:any = ' ';
  public tips;
  itemsPPage = 10;
  curPage = '1';
  constructor(public tipsService: TipsService, overlay: Overlay, public modal: Modal, public router: Router, private route: ActivatedRoute) {

    this.curPage = route.params['_value']['page'];
    this.searchText = route.params['_value']['search'];

    if(route.params){
       this.articleId = route.params['_value']['tipId'];
       console.log(this.articleId + 'CATEGORY');
    }

    this.loadComments();
  }

  loadComments() {
    this.tipsService.getComments()
      .then(data => {     
        this.Comments = data;
        console.log(this.Comments);
      });
  }

  //publish comment

  publishComment(comment) {
  
  this.tipsService.publishComment(comment.id).then(
     data => {        
          this.tipPublished();
        }, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  // publish comment End
  tipPublished(){
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('Added Comment')
      .body(`<p>Your Comment is published successfully</p>`)
      .open();
  }

  // Delete Comment

    DelComment(comment) {
    var confirmed = confirm("Are you sure to delete?");
    if(confirmed){
      this.tipsService.deleteComment(comment.id)
        .then(
          data => {
            this.Comments.splice(this.Comments.indexOf(comment),1);
            this.delSuccess();
          }, //Bind to view
          err => {
            // Log errors if any
            console.log(err);
            alert("fail");
          });
    }

  }

    delSuccess(){
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('Delete Comment')
      .body(`<p>Your Comment is Deleted successfully</p>`)
      .open();
  }

  // Delete Comment

    DelCategory(category) {
      console.log(category);

    // var confirmed = confirm("Are you sure to delete?");
    if(category.count == 0){
         this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Added Comment')
        .body(`<p>Comment is deleted successfully.</p>`)
        .open();
      this.tipsService.deleteCategory(category.id)
        .then(
          data => {
            this.Comments.splice(this.Comments.indexOf(category),1);
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
        .title('Added Comment')
        .body(`<p>Comment cannot be deleted, As it has some Comments added.</p>`)
        .open();
    }

  }

  pagination(i,p){ 
  alert("fghf");
    return ((Number(this.curPage)- 1)*this.itemsPPage)+i+1;
  }

  changePage(event){
    //this.router.navigate(['/comments/'+ event + '/ ']);
    this.curPage = event;
  }

}
