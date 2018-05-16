import { Component, OnInit, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ProductsComponent } from '../products/products.component';
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
  productcat: any;
  options = new RequestOptions({ withCredentials: true });
  income: number;
  pieChartData = {
    chartType: 'ColumnChart',
    dataTable: [
      ['0', '0'],
      ['Felhasználók', this.a],
      ['Eladott termék', this.b],
      ['Termék ára', this.d],
      ['Nem vásárló felhasználók', (this.b - this.a) * (-1)],
      ['Átlag', (this.c * this.d) / this.b]
    ],
    options: {
      'title': 'Stat',
      legend: 'none'
    },
  };
  constructor(public http: Http) {
    this.getProducts();
   }
  ngOnInit() {
  }
  getProducts() {
    this.http.get('http://localhost:8080/item', this.options)
      .subscribe(getProducts => {
        this.productcat = JSON.parse(getProducts['_body']);
        console.log(this.productcat);
        this.Income();
      });
  }
  Income() {
    this.income = 0;
    for (let i = 0; i < (this.productcat).length; i++) {
      this.income += ((this.productcat)[i]).price;
    }
    console.log(this.income);
  }
}
