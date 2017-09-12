import { Component, ViewContainerRef } from '@angular/core';
import {TipsService} from '../providers/tipsProvider/tipsProvider';
import { Router, ActivatedRoute } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';


@Component({
  templateUrl: 'vendorsList.component.html'
})
export class vendorsListComponent {
  public vendors;
  public tips;
  itemsPPage = 10;
  curPage = '1';
  constructor(public tipsService: TipsService, public router: Router, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,private route: ActivatedRoute) {
    this.loadVendors();
    this.curPage = route.params['_value']['page'];
    overlay.defaultViewContainer = vcRef;
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

  loadVendors() {
    this.tipsService.getVendorList()
      .then(data => {
        this.vendors = data;
      });
  }

  vendorBlock(vendor){
    console.log(vendor.id);
    this.tipsService.vendorBlock(vendor.id)
      .then(
        data => {
          this.loadVendors();
      }, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  status(){
    this.modal.alert()
      .size('sm')
      .showClose(true)
      .title('Added Tip')
      .body(`<p>Vendor is Enabled</p>`)
      .open();
  }

pagination(i,p){    

    return ((Number(this.curPage)- 1)*this.itemsPPage)+i+1;

  }

  changePage(event){
    this.router.navigate(['/vendorsList/'+event]);
    this.curPage = event;
  }

}
