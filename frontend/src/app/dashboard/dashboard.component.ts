import { Component, OnInit, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { OrdersComponent } from '../orders/orders.component';
import { Observable } from 'rxjs/Observable';


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
  orderDate: string;
  pieChartData = {
    chartType: 'LineChart',
    dataTable: [
      ['0', '0'],
      ['date', this.orderPrice],
    ],
    options: {
      'title': 'E havi bevétel napokra bontva',
      legend: 'none'
    },
  };
  constructor(public http: Http) {
    this.getOrders();
    setTimeout(() => {
      this.getAllOrdersPrice();
    }, 5000);
    setTimeout(() => {
      this.getOrdersDate();
    }, 5000);
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
    for (let i = 0; i < this.order.length; i++) {
      this.orderPrice += this.order[i].price;
    }
    console.log(this.orderPrice);
  }
  getOrdersDate() {
    this.orderDate = '';
    for (let i = 0; i < (this.order).length; i++) {
      this.orderDate += ((this.order)[i]).createdAt.slice(5, 10);
     }
     console.log(this.orderDate);
  }


}

