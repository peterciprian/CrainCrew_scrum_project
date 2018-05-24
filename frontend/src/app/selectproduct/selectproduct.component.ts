import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Item } from '../item';


@Component({
  selector: 'app-selectproduct',
  templateUrl: './selectproduct.component.html',
  styleUrls: ['./selectproduct.component.css']
})
export class SelectproductComponent implements OnInit {
  router: Router;
  selectedProduct: Item = {
    _id: '',
    name: '',
    url: '',
    img: '',
    manufacturer: '',
    price: 0,
    category: '',
  };
  categs: Array<any>;
  categ = {
    name: '',
    user: '',
    sequence: ''
  };
  orders: Array<any>;
  comments: Array<any>;
  actualComments = [];
  newComment: any = {
    user: {},
    comment: '',
    item: {},
    confirmed: false,
  };

  cart = [];
  registerred = false;
  longgedIn = false;
  isAdmin = false;
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
  listComments() {
    this.http.get('http://localhost:8080/comment', this.options)
    .subscribe(data => {
      this.comments = JSON.parse(data['_body']);
      console.log(this.comments);
    });
  }

  filterCommentsByItem(selectedProduct) {
    return this.comments.filter(comment => comment.item === selectedProduct._id );
  }
  sendNewComment() {
    console.log(this.loggedInUser.user['_id'], this.newComment.item['_id']);
    this.newComment.user['_id'] = this.loggedInUser.user['_id'];
    this.newComment.item['_id'] = this.selectedProduct._id;
    this.newComment.confirmed = this.isConfirmed();
    console.log(this.newComment);
    this.http.post('http://localhost:8080/comment/', this.newComment, this.options)
      .subscribe((data) => {this.comments = JSON.parse(data['_body']);
      this.listComments(); });
  }
  isConfirmed() {
    for (let i = 0; i < this.orders.length; i++) {
      for (let j = 0; j < this.orders[i].items.length; j++) {
        // tslint:disable-next-line:max-line-length
        if (this.orders[i].user['_id'] === this.newComment.user['_id'] && this.orders[i].items[j].item['_id'] === this.newComment.item['_id']) {
          this.newComment.confirmed = true;
        }
      }
    }
    return false;
  }
  listOders() {
    this.http.get('http://localhost:8080/order/', this.options)
    .subscribe(data => {
      this.orders = JSON.parse(data['_body']);
      console.log(this.orders);
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
  delete(itemId) {
    if (confirm('Really?')) {
      this.http.delete(this.baseUrl + itemId, this.options)
        .subscribe(data => {
          console.log(data);
        });
    }
  }
  update() {
    if (this.selectedProduct.oldImg) {
      delete this.selectedProduct.oldImg;
    }

    if (this.selectedProduct.newImg) {
      this.selectedProduct.oldImg = this.selectedProduct.img ? this.selectedProduct.img : 'none';
      this.selectedProduct.img = this.selectedProduct.newImg;
    }

    this.http.put(this.baseUrl + this.id.id, this.selectedProduct, this.options)
      .subscribe(data => {
        console.log(data);
        setTimeout(() => {
          this.navigate();
        }, 1000);

      });
  }

  listCateg() {
    this.http.get('http://localhost:8080/categ/', this.options)
      .subscribe(data => {
        const temp = JSON.parse(data['_body']);
        temp.sort((a, b) => a.sequence - b.sequence);
        this.categs = temp;
      });
  }

  addToCart(selectedProduct) {
    this.cart = (localStorage.cartItems ? JSON.parse(localStorage.cartItems) : []);
    const find = this.cart.findIndex(i => i['_id'] === selectedProduct['_id']);

    if (find !== -1) {
        this.flashMessagesService.show('A termék már szerepel a kosárban!', { cssClass: 'alert-danger' });
      } else {this.cart.push(selectedProduct);
    this.flashMessagesService.show('A termék bekerült a kosárba!', { cssClass: 'alert-success' }); }
    localStorage.cartItems = JSON.stringify(this.cart);
  }

  deleteComment(comment) {
      if (confirm('Really?')) {
        this.http.delete('http://localhost:8080/comment/' + comment['_id'] , this.options)
          .subscribe(data => {
            console.log(data);
            this.listComments();
          });
      }
    }

  ngOnInit() {this.navigate();
  this.isLoggedIn();
this.listComments();
this.listOders();
this.listCateg(); }
}
