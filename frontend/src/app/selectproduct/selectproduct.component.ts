import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Item } from '../item';

@Component({
  selector: 'app-selectproduct',
  templateUrl: './selectproduct.component.html',
  styleUrls: ['./selectproduct.component.css']
})
export class SelectproductComponent implements OnInit {
  selectedProduct: Item = {
    _id: '',
    name: '',
    url: '',
    img: '',
    manufacturer: '',
    price: 0,
    category: '',
  };
  cart = [];
  registerred = false;
  longgedIn = false;
  isAdmin = true;
  loggedInUser: any;
  id: any;
  options = new RequestOptions({ withCredentials: true });
  error = false;
  baseUrl = 'http://localhost:8080/item/';

  constructor(private route: ActivatedRoute, public http: Http, private flashMessagesService: FlashMessagesService) {
    this.route.params.subscribe(params => {
      this.id = params;
    });
  }
  isLoggedIn() {
    this.http.get('http://localhost:8080/user/profile', this.options)
      .subscribe(data => {
        this.loggedInUser = JSON.parse(data['_body']);
        console.log(this.loggedInUser);
        if (this.loggedInUser.user) {
          this.longgedIn = true;
          if (this.loggedInUser.user.role === 'admin') {
            this.isAdmin = true;
          }
        }
        console.log('Anyone logged in? - product component:' + this.longgedIn);
        console.log('Is admin:' + this.isAdmin);
      });
  }
  navigate() {
    this.http
      .get('http://localhost:8080/item/' + this.id.id, this.options)
      .subscribe(data => {
        const body = JSON.parse(data['_body']);
        this.selectedProduct = body;
        if (body == null || body.error) {
          this.error = true;
        }
      });
  }
  modalChange(id) {
    const choosen = this.selectedProduct;
    this.selectedProduct = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
  }
  update() {
    if (this.selectedProduct.oldImg) {
      delete this.selectedProduct.oldImg;
    }

    if (this.selectedProduct.newImg) {
      this.selectedProduct.oldImg = this.selectedProduct.img ? this.selectedProduct.img : 'none';
      this.selectedProduct.img = this.selectedProduct.newImg;
    }

    this.http.put(this.baseUrl + this.selectedProduct['_id'], this.selectedProduct, this.options)
      .subscribe(data => {
        console.log(data);
        setTimeout(() => {
          this.navigate();
        }, 1000);

      });
  }

  addToCart(selectedProduct) {
    this.cart = (localStorage.cartItems ? JSON.parse(localStorage.cartItems) : []);
    const find = this.cart.findIndex(i => i['_id'] === this.selectedProduct['_id']);

    if (find !== -1) {
        this.flashMessagesService.show('A termék már szerepel a kosárban!', { cssClass: 'alert-danger' });
      } else {this.cart.push(selectedProduct);
    this.flashMessagesService.show('A termék bekerült a kosárba!', { cssClass: 'alert-success' }); }
    localStorage.cartItems = JSON.stringify(this.cart);
  }

  ngOnInit() {this.navigate();
  this.isLoggedIn(); }
}
