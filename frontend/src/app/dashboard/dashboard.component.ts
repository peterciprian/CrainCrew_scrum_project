import { Component, OnInit, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { OrdersComponent } from '../orders/orders.component';
import { Observable } from 'rxjs/Observable';
import { BaseChartDirective } from 'ng2-charts';

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
  pieChartData = {
    chartType: 'ColumnChart',
    dataTable: [
      ['0', '0'],
    ],
    options: {
      'title': 'E havi bevétel napokra bontva',
      legend: 'none',
      is3D: 'true',
    },
  };
  constructor(public http: Http) {
    this.getOrders();
    setTimeout(() => {
      this.getAllOrdersPrice();
    }, 3000);
    setTimeout(() => {
      this.getOrdersDate();
    }, 3000);
     setTimeout(() => {
      this.fillDataTable();
    }, 3000);
   }
  ngOnInit() {
  }
  getOrders() {
    this.http.get('http://localhost:8080/order', this.options)
      .subscribe(getOrders => {
        this.order = JSON.parse(getOrders['_body']);
        console.log(this.order);
      });
  }
  getAllOrdersPrice() {
    this.orderPrice = 0;
    this.singleorderPrice = [];
    for (let i = 0; i < this.order.length; i++) {
      this.orderPrice += this.order[i].price;
      this.singleorderPrice.push(Number(this.order[i].price));
    }
    console.log(this.orderPrice);
    console.log(this.singleorderPrice);
  }
  getOrdersDate() {
    this.singleorderDate = Array<number>;
    for (let i = 0; i < this.order.length; i++) {
      this.singleorderDate.push(Number(this.order[i].createdAt.slice(8, 10)));
     }
     console.log(this.singleorderDate);
  }

  fillDataTable() {
    for (let i = 0; i < this.singleorderPrice.length; i++) { 
      this.pieChartData.dataTable.push([this.singleorderDate[i], this.singleorderPrice[i]]);
      this.filltable = true;
  }
    console.log(this.pieChartData);
  }
}




