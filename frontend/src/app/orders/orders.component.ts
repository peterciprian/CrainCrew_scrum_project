import { Component, OnInit } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/item/';

  orders: any;
  users: any;
  items: any;

  actualOrder: object = {
    user : '',
    items : [
      {item : '', quantity : ''}
    ],
    price : ''
  };

  newOrder: object = {
    user : '',
    items : [
      {item : '', quantity : ''}
    ],
    price : ''
  };


  constructor(public http: Http) {
    this.listOrders();
    this.listItems();
    this.listUsers();
  }

  ngOnInit() {
  }

  listOrders() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.orders = JSON.parse(data['_body']);
      });
  }
  listUsers() {
    this.http.get('http://localhost:8080/user/users', this.options)
      .subscribe(data => {
        this.users = JSON.parse(data['_body']);
      });
  }
  listItems() {
    this.http.get('http://localhost:8080/item/', this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
      });
  }

  find(orderId) {
    this.http.get(this.baseUrl + orderId, this.options)
      .subscribe(data => {
        this.orders = JSON.parse(data['_body']);
        console.log(this.orders);
      });
  }

  create() {
    console.log(this.newOrder);
    this.http.post(this.baseUrl, this.newOrder, this.options)
      .subscribe(data => {
        console.log(data);
        this.listOrders();
      });
  }
  update(order) {
    this.actualOrder = order;
    this.http.put(this.baseUrl + 'update/' + this.actualOrder['_id'], this.actualOrder, this.options)
      .subscribe(data => {
        console.log(data);
        this.listOrders();
      });
  }

  delete(itemId) {
    if (confirm('Really?')) {
      this.http.delete(this.baseUrl + 'delete/' + itemId, this.options)
        .subscribe(data => {
          console.log(data);
          this.listOrders();
        });
    }
  }

}
