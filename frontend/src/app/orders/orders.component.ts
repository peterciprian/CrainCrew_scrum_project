import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';

@Pipe({ name: 'total' })
export class TotalPipe implements PipeTransform {
  transform(order: any) {
    let total = 0;
    // console.log();
    for (let i = 0; i < order.items.length; i++) {
      total += order.items[i].item.price * order.items[i].quantity;
    }
    return `${total} HUF`;
  }
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/order/';

  orders: any;
  users: any;
  items: any;

  actualOrder = {
    user: '',
    items: [
      { item: '', quantity: '' }
    ],
    price: 0
  };

  newOrder = {
    user: '',
    items: [
      { item: '', quantity: '' }
    ],
    price: 0
  };

  price: number;

  constructor(public http: Http) {
    this.listOrders();
    this.listUsers();
    this.listItems();
  }

  ngOnInit() {
  }

  listOrders() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.orders = JSON.parse(data['_body']);
        // console.log(this.orders);
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
        // console.log(this.items);
      });
  }

  find(orderId) {
    this.http.get(this.baseUrl + orderId, this.options)
      .subscribe(data => {
        this.orders = JSON.parse(data['_body']);
        // console.log(this.orders);
      });
  }

  create(orderedItems) {
    let sumPrice = 0;
    for (let i = 0; i < orderedItems.length; i++) {
      for (let j = 0; j < this.items.length; j++) {
        if (orderedItems[i].item === this.items[j]['_id'] ) {
          sumPrice += Number(this.items[j].price) * Number(orderedItems[i].quantity);
        }
    }}
    this.newOrder.price = sumPrice;
    this.http.post(this.baseUrl, this.newOrder, this.options)
      .subscribe(data => {
        // console.log(data);
        this.listOrders();
      });
  }
  update(orderedItems) {
    let sumPrice = 0;
    for (let i = 0; i < orderedItems.length; i++) {
      for (let j = 0; j < this.items.length; j++) {
        if (orderedItems[i].item === this.items[j]['_id'] ) {
          sumPrice += Number(this.items[j].price) * Number(orderedItems[i].quantity);
        }
    }}
    this.actualOrder.price = sumPrice;
    this.http.put(this.baseUrl + 'update/' + this.actualOrder['_id'], this.actualOrder, this.options)
      .subscribe(data => {
        // console.log(data);
        this.listOrders();
      });
  }

  delete(itemId) {
    if (confirm('Really?')) {
      this.http.delete(this.baseUrl + 'delete/' + itemId, this.options)
        .subscribe(data => {
          // console.log(data);
          this.listOrders();
        });
    }
  }
  addModalRow() {
    this.actualOrder.items.push({
      item: '',
      quantity: '',
    });
  }

  removeModalRow(id) {
    // console.log(id);
    this.actualOrder.items = this.actualOrder.items.filter(asd => asd['_id'] !== id._id);
    // console.log(this.actualOrder);
  }

  addRow() {
    this.newOrder.items.push({
      item: '',
      quantity: ''
    });
    // console.log(this.newOrder);
  }

  loadModalData(order) {
    this.actualOrder = order;
    // console.log(this.actualOrder);
  }

}
