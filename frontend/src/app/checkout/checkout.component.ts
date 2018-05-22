import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RequestOptions, Http } from '@angular/http';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cart = JSON.parse(localStorage.getItem('cartItems'));
  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/order/';
  newOrder = {
    user: '',
    items: [
      { item: '', quantity: 1 }
    ],
    price: 0
  };
  loggedInUser: any;
  items: any;

  constructor(public http: Http, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.loadOrder();
    this.listItems();
  }

  loadOrder() {
    this.http.get('http://localhost:8080/user/profile', this.options)
      .subscribe(data => {
        this.loggedInUser = JSON.parse(data['_body']);
        this.newOrder.user = this.loggedInUser.user['_id'];
      });
    this.newOrder.price = this.cartSum();
    this.newOrder.items = [];
    for (let i = 0; i < this.cart.length; i++) {
      this.newOrder.items.push({item: this.cart[i]['_id'], quantity: 1});
    }
    console.log(this.newOrder);
  }

  listItems() {
    this.http.get('http://localhost:8080/item/', this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
      });
  }

  cartSum() {
    let sum = 0;
    this.cart.forEach(item => {
      sum += item.price;
    });
    return sum;
  }
  countCartPrice() {
    let sumPrice = 0;
    for (let i = 0; i < this.newOrder.items.length; i++) {
      for (let j = 0; j < this.items.length; j++) {
        if (this.newOrder.items[i].item === this.items[j]['_id'] ) {
          sumPrice += Number(this.items[j].price) * Number(this.newOrder.items[i].quantity);
        }
    }}
    this.newOrder.price = sumPrice;
  }

  createOrder(cart) {
    // console.log(this.newOrder);
    this.http.post(this.baseUrl, this.newOrder, this.options)
      .subscribe(data => {
        console.log(data);
        if (data.ok) {
          this.flashMessagesService.show('A rendelés sikeresen elküldve!', { cssClass: 'alert-success' });
          localStorage.clear();
          this.loadOrder();
        } else {this.flashMessagesService.show('Valami para van! Kérjük próbálja újra!', { cssClass: 'alert-danger' }); }
      });
  }

  addOneMore(index) {
    this.newOrder.items[index].quantity++;
    this.countCartPrice();
  }

  removeOne(index) {
    if (this.newOrder.items[index].quantity > 1) { this.newOrder.items[index].quantity--;
      this.countCartPrice();
    }
  }

}
