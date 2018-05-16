import { Component, OnInit, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { OrdersComponent } from '../orders/orders.component';
import { Observable } from 'rxjs/Observable';
import { UsersComponent } from '../users/users.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  a = Math.floor(Math.random() * Math.floor(200));
  b = Math.floor(Math.random() * Math.floor(200));
  c = Math.floor(Math.random() * Math.floor(200));
  d = Math.floor(Math.random() * Math.floor(200));
  order: any;
  options = new RequestOptions({ withCredentials: true });
  orderPrice: number;
  orderDate: string ;
  pieChartData = {
    chartType: 'LineChart',
    dataTable: [
      ['0', '0'],
      ['date', this.a],
      ['date', this.b],
      ['date', this.c],
      ['date', this.d],
    ],
    options: {
      'title': 'E havi bevétel napokra bontva',
      legend: 'none'
    },
  };
  constructor(public http: Http) {
    this.getOrders();
   }
  ngOnInit() {
  }
  getOrders() {
    this.http.get('http://localhost:8080/order', this.options)
      .subscribe(getOrders => {
        this.order = JSON.parse(getOrders['_body']);
        console.log(this.order);
        this.getOrdersPrice();
      });
  }
  getOrdersPrice() {
    this.orderPrice = 0;
    for (let i = 0; i < (this.order).length; i++) {
      this.orderPrice += ((this.order)[i]).price;
    }
    console.log(this.orderPrice);
  }
  getOrdersDate() {
    this.orderDate = 'ExampleDate';
    for (let i = 0; i < (this.order).length; i++) {
      this.orderDate += ((this.order)[i]).date;
     }
     console.log(this.orderDate);
  }


}

