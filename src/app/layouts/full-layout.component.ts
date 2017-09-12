import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  public userData:any = JSON.parse(localStorage.getItem('userData'));
  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  constructor(public router: Router){

  }

  ngOnInit(): void {}

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
  logout(){
    this.router.navigate(['/pages/login']);
    localStorage.removeItem('userData');
  }
}
