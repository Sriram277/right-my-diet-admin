import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {globalService} from './globalService';
import {Component} from '@angular/core';

@Injectable()
export class TipsService {
  data;
  options;
  imageData;
  constructor(public http: Http, public globalservices:globalService) {
    console.log(globalservices.url + 'category');
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.options = new RequestOptions({headers: headers});
    console.log('Hello TipsService Provider');
  }

  load(userId) {
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/articles/'+ userId +'/list/all')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  public getCategories() {
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/category/list/all')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  public getOneTip(tipId) {
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/articles/get/' + tipId + '/one')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  public addTip(data,idVal) {
    return new Promise(resolve => {
      this.http.post('https://right-my-diet.herokuapp.com/articles/'+idVal+'/create', data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

    public AddCategory(data) {
    return new Promise(resolve => {
      this.http.post('https://right-my-diet.herokuapp.com/category/12345/create', data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  public updateTip(tipId, data) {
    return new Promise(resolve => {
      this.http.put('https://right-my-diet.herokuapp.com/articles/' + tipId + '/update', data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  deleteTip(tipId) {
    return new Promise(resolve => {
      this.http.delete('https://right-my-diet.herokuapp.com/articles/' + tipId + '/delete')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  makePublish(tipId){
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/articles/' + tipId + '/make/publish')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  fileUpload(file) {
    console.log(file);
    let headers = new Headers();
    let formData: FormData = new FormData();
    formData.append('content', file);
    return new Promise(resolve => {
      this.http.post('https://right-my-diet.herokuapp.com/file/uploads3', formData, {
        headers: headers
      })
        .map(res => res.json())
        .subscribe(data => {
          // console.log(data)
          this.data = data;
          resolve(this.data);
        })
    });
  }

 public getdeletedTip(userId) { 
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/articles/'+ userId +'/deletedUserTips')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

   public perdeleteTip(tipId) {   
    return new Promise(resolve => {
      this.http.delete('https://right-my-diet.herokuapp.com/articles/' + tipId + '/trash')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

     public deleteCategory(categoryId) {
    return new Promise(resolve => {
      this.http.delete('https://right-my-diet.herokuapp.com/category/' + categoryId + '/deleteCategory')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

    public getOneCategory(categoryId) {  
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/category/' + categoryId + '/findCategory')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }
    public updateCategory(categoryId, data) {
    return new Promise(resolve => {
      this.http.put('https://right-my-diet.herokuapp.com/category/' + categoryId + '/update', data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

    allTips(userId) {
    return new Promise(resolve => { 
      this.http.get('https://right-my-diet.herokuapp.com/articles/'+ userId +'/list/all')
        .map(res => res.json())
        .subscribe(data => {
          let b =[];
          data.forEach(element => {
            if(element.userId != userId){
               b.push(element);
            }
          });
           this.data = b;
           resolve(this.data);
        });
    });

  }

 searchTips(searchVal, categoryIdVal, userId){
    if(categoryIdVal == 'all'){
      return new Promise(resolve => {
        this.http.get('https://right-my-diet.herokuapp.com/articles/'+ userId +'/'+ searchVal +'/userWiseTipsSearch')
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    } else if(categoryIdVal != 'all'){
       return new Promise(resolve => {
        this.http.get('https://right-my-diet.herokuapp.com/articles/'+categoryIdVal+'/'+searchVal+'/categoryTipsSearch')
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    }
 }

 searchUserDelTips(searchVal, categoryIdVal, userId){
  if(categoryIdVal == 'all'){
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/articles/'+ userId +'/deletedUserTips?str='+ searchVal )
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          console.log(this.data);
          
        });
    });
  // } else if(categoryIdVal != 'all'){
  //    return new Promise(resolve => {
  //     this.http.get('https://right-my-diet.herokuapp.com/articles/'+categoryIdVal+'/'+searchVal+'/categoryTipsSearch')
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         this.data = data;
  //         resolve(this.data);
  //       });
  //   });
   }
}
 
  searchTipsAll(searchVal, categoryIdVal){      
    if(categoryIdVal == 'all'){
      return new Promise(resolve => {
        this.http.get('https://right-my-diet.herokuapp.com/articles/'+ searchVal +'/searchTips')
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    } else if(categoryIdVal != 'all'){
       return new Promise(resolve => {
        this.http.get('https://right-my-diet.herokuapp.com/articles/'+categoryIdVal+'/'+searchVal+'/categoryTipsSearch')
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    }

  }

  public getVendorList() {  
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/user/userVendorDetails')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  public vendorBlock(userId){  
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/user/'+userId+'/userBlockActive')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  public getComments() {
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/comments/display/all')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  public publishComment(commentId) {
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/articles/'+commentId+'/publish')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    }); 
  }

  public deleteComment(commentId) {
    return new Promise(resolve => {
      this.http.delete('https://right-my-diet.herokuapp.com/articles/' + commentId + '/deleteComment')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

    public searchElements(str) {
    return new Promise(resolve => {
      this.http.get('https://right-my-diet.herokuapp.com/tags/search/' + str)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    }); 
  }
  
}

