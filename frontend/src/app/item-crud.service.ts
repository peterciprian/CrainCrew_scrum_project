import { Injectable } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';

@Injectable()
export class ItemCrudService {

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/item/';
  items: any;

  constructor(public http: Http) { }

  list() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
        console.log(this.items);
      });
  }

  find(itemId) {
    this.http.get(this.baseUrl + itemId, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
        console.log(this.items);
      });
  }

  create(item) {
    this.http.post(this.baseUrl, item, this.options)
      .subscribe(data => {
        console.log(data);
    });
}

  update(itemId, item) {
    this.http.put(this.baseUrl + itemId, item, this.options)
      .subscribe(data => {
        console.log(data);
      });
  }


  delete(itemId) {
    this.http.delete(this.baseUrl + itemId, this.options)
      .subscribe(data => {
        console.log(data);
      });
  }

}
