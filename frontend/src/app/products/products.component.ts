import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { ItemCrudService } from '../item-crud.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  options = new RequestOptions({ withCredentials: true });
  //baseUrl = 'https://api.mlab.com/api/1/databases/crane-crew/collections/items/?apiKey=IM0DBPnVxrZDK4-YxGS0hxzTSXVbKRED';
  baseUrl = 'http://localhost:8080/item/';
  items: any;
  ngOnInit() {
  }

  constructor(public http: Http) { this.list(); }

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
