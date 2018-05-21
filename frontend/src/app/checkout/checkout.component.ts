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

  constructor(public http: Http) { }

  ngOnInit() {
    this.loadOrder();
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

  cartSum() {
    let sum = 0;
    this.cart.forEach(item => {
      sum += item.price;
    });
    return sum;
  }

  createOrder(cart) {
    console.log(this.newOrder);
    /*this.http.post(this.baseUrl, this.newOrder, this.options)
      .subscribe(data => {
        console.log(data);
      });*/
  }
  addOneMore(index) {
    this.newOrder.items[index].quantity++;
    console.log(index);
  }

  removeOne(index) {
    if (this.newOrder.items[index].quantity > 0) { this.newOrder.items[index].quantity--; }
    console.log(index);
  }

}
