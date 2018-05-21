import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cart = JSON.parse(localStorage.getItem('cartItems'));

  constructor() { }

  ngOnInit() {
  }

  cartSum() {
    let sum = 0;
    this.cart.forEach(item => {
      sum += item.price;
    });
    return sum;
  }

}
