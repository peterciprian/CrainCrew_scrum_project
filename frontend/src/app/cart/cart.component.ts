import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart = JSON.parse(localStorage.getItem('cartItems'));

  constructor(private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  removeFromCart(item) {
    console.log(item);
    this.cart = this.cart.filter(asd => asd['_id'] !== item._id);
    this.flashMessagesService.show('A termék kikerült a kosárból!', { cssClass: 'alert-success' });
    localStorage.cartItems = JSON.stringify(this.cart);
  }

  updateCart(item) {
    console.log(item);
  }
}
