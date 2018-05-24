import { TotalPipe } from './../orders/orders.component';
import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { OrdersComponent } from '../orders/orders.component';
import { Observable } from 'rxjs/Observable';
import { UsersComponent } from '../users/users.component';
import { ProductsComponent } from '../products/products.component';
import { ItemCrudService } from '../item-crud.service';
import { Item } from '../item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  order: any;
  options = new RequestOptions({ withCredentials: true });
  orderPrice: number;
  singleorderPrice: Array<number>;
  singleorderDate: Array<number>;
  orderDate: string;
  filltable: boolean;
  pieChartData: any = {
    chartType: 'ColumnChart',
    dataTable: [
      ['0', '0'],
    ],
    options: {
      legend: 'none',
      is3D: 'true',
      chartArea: {width: '90%', height: '70%'},
    },
  };
  users: any;
  orders: any;
  baseUrl = 'http://localhost:8080/user/users';
  baseUrl2 = 'http://localhost:8080/item';
  baseUrl3 = 'http://localhost:8080/order/';
  items: Array<Item>;

  constructor(
    public http: Http
  ) {
    this.getOrders();
    setTimeout(() => {
      this.getAllOrdersPrice();
    }, 1000);
    setTimeout(() => {
      this.getOrdersDate();
    }, 1000);
     setTimeout(() => {
      this.fillDataTable();
    }, 1000);
    this.getUsers();
    this.listItems();
    this.listOrders();
   }
  ngOnInit() {
  }
  getOrders() {
    this.http.get('http://localhost:8080/order', this.options)
      .subscribe(getOrders => {
        this.order = JSON.parse(getOrders['_body']);
        // console.log(this.order.length);
      });
  }
  getAllOrdersPrice() {
    this.orderPrice = 0;
    this.singleorderPrice = [];
    for (let i = 0; i < this.order.length; i++) {
      this.orderPrice += this.order[i].price;
      this.singleorderPrice.push(this.order[i].price);
    }
    // console.log(this.orderPrice);
    // console.log(this.singleorderPrice);
  }
  getOrdersDate() {
    this.singleorderDate = [];
    for (let i = 0; i < this.order.length; i++) {
      this.singleorderDate.push(this.order[i].updatedAt.slice(8, 10));
     }
     // console.log(this.singleorderDate);
  }

  fillDataTable() {
    const data = {};
    for (let i = 0; i < this.singleorderPrice.length; i++) {
      if (!data[this.singleorderDate[i]]) {
        data[this.singleorderDate[i]] = 0;
      }
      data[this.singleorderDate[i]] += this.singleorderPrice[i];
    }
    // console.log(data);
    // tslint:disable-next-line:forin
    for (const k in data) {
      this.pieChartData.dataTable.push([k, data[k]]);
    }
    this.filltable = true;
    // console.log(this.pieChartData);
  }
  getUsers() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.users = JSON.parse(data['_body']);
        // console.log(this.users.length);
  });
  }
  listItems() {
    this.http.get(this.baseUrl2, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
        // console.log(this.items.length);
      });
  }

  listOrders() {
    this.http.get(this.baseUrl3, this.options)
      .subscribe(data => {
        this.orders = JSON.parse(data['_body']);
        // console.log(this.orders.length);
      });
  }


}




