import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Http } from '@angular/http';
import { Globals } from '../globals';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart = JSON.parse(localStorage.getItem('cartItems'));
  loggedInUser: any;
  loggedIn: any;

  constructor(private flashMessagesService: FlashMessagesService, public http: Http, public global: Globals) { }

  ngOnInit() {
  }

  removeFromCart(item) {
    // console.log(item);
    this.cart = this.cart.filter(asd => asd['_id'] !== item._id);
    this.flashMessagesService.show('A termék kikerült a kosárból!', { cssClass: 'alert-success' });
    localStorage.cartItems = JSON.stringify(this.cart);
    this.getQuantity();
  }
  getQuantity() {
    if (JSON.parse(localStorage.getItem('cartItems')) === null) {
      this.global.badge = 0;
    } else {
      /* const cart = JSON.parse(localStorage.getItem('cartItems')).products; */
      this.cart = JSON.parse(localStorage.getItem('cartItems')) || [];
      this.global.badge = this.cart.length;
    }
  }

  cartSum() {
    let sum = 0;
    this.cart.forEach(item => {
      sum += item.price;
    });
    return sum;
  }

  emptyCart() {
    this.cart = [];
    localStorage.clear();
    this.getQuantity();
  }

}
