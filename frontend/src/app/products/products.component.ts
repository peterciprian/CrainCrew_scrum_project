import { Component, OnInit, Input } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Item } from '../item';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Globals } from '../globals';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  options = new RequestOptions({ withCredentials: true });
  // baseUrl = 'https://api.mlab.com/api/1/databases/crane-crew/collections/items/?apiKey=IM0DBPnVxrZDK4-YxGS0hxzTSXVbKRED';
  baseUrl = 'http://localhost:8080/item/';
  items: Array<Item>;
  orders: Array<any>;
  comments: Array<any>;
  actualComments = [];
  newComment: any = {
    user: {},
    comment: '',
    item: {},
    confirmed: false,
  };
  actualItem: Item = {
    _id: '',
    name: '',
    url: '',
    img: '',
    manufacturer: '',
    price: 0,
    category: '',
  };

  item: Item = {
    name: '',
    url: '',
    img: '',
    manufacturer: '',
    price: 0,
    category: '',
  };

  myForm: FormGroup;

  showThumbnail = true;

  searchValue = '';
  searchSuccess = true;
  searchFor: string;

  lastKey = '';
  multiplier = 1;

  registerred = false;
  longgedIn = false;
  isAdmin = false;
  loggedInUser: any;

  cart = [];
  categs: Array<any>;
  categ = {
    name: '',
    user: '',
    sequence: ''
  };

  ngOnInit() {
    this.isLoggedIn();
    this.list();
    this.listCateg();
    this.listOders();
    this.listComments();

    this.myForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      'manufacturer': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      'url': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      'price': new FormControl('', [
        Validators.required,
        Validators.min(1000),
      ]),
      'category': new FormControl('', Validators.required),
      'img': new FormControl('')
    });
  }

  constructor(
    public http: Http,
    private flashMessagesService: FlashMessagesService,
    public global: Globals) {

  }

  /**
 * Bekéri a szerveről, az aktuálisan belépett user adatait
 * először az OnInit hívja meg, ill login() metódus végé is meghívjuk
 * ha nincs senki belépve, üres objectummal tér vissza
 * Ha van user, egy user objectumot ad vissza: loggedInUser változóba
 * Ha van user megnézi a role tulajdonságát, ha admin, az isAdmi változót "true"-ra állítja
*/
  isLoggedIn() {
    this.http.get('http://localhost:8080/user/profile', this.options)
      .subscribe(data => {
        this.loggedInUser = JSON.parse(data['_body']);
        // console.log(this.loggedInUser);
        if (this.loggedInUser.user) {
          this.longgedIn = true;
          if (this.loggedInUser.user.role === 'admin') {
            this.isAdmin = true;
          }
        }
        // console.log('Anyone logged in? - product component:' + this.longgedIn);
        // console.log('Is admin:' + this.isAdmin);
      });
  }

  showThumbnailSwitch() {
    this.showThumbnail = true;
    this.list();
  }

  showList() {
    this.showThumbnail = false;
    this.list();
  }

  showSelectedTable(categ) {
    this.showThumbnail = false;
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']).filter(item => item.category === categ);
      });
  }

  list() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
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


  find(itemId) {
    this.http.get(this.baseUrl + itemId, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
        // console.log(this.items);
      });
  }

  create() {
    // console.log(this.item);
    this.http.post(this.baseUrl, this.item, this.options)
      .subscribe(data => {
        // console.log(data);
        this.item = {
          name: '',
          url: '',
          img: '',
          manufacturer: '',
          price: 0,
          category: '',
        };
        this.list();
        this.myForm.reset();
      });
  }

  modalChange(id) {
    const choosen = this.items.filter(item => item._id === id)[0];
    this.actualItem = Object.assign({}, choosen); // a this.modal megkapja egy duplik�ci�j�t a choosennen
    this.actualComments = this.filterCommentsByItemId(id);
    /* // console.log(this.actualComments); */
  }

  /**
   * Ha van új link megadva: newImg, létrehoz egy oldImg tulajdonségot
   * ami megkapja az eredeti img tulajdonság értékét, vagyis a file mentett nevét
   */
  update() {
    if (this.actualItem.oldImg) {
      delete this.actualItem.oldImg;
    }

    if (this.actualItem.newImg) {
      this.actualItem.oldImg = this.actualItem.img ? this.actualItem.img : 'none';
      this.actualItem.img = this.actualItem.newImg;
    }

    this.http.put(this.baseUrl + this.actualItem['_id'], this.actualItem, this.options)
      .subscribe(data => {
        // console.log(data);
        setTimeout(() => {
          this.list();
        }, 1000);
      });
  }


  delete(itemId) {
    if (confirm('Really?')) {
      this.http.delete(this.baseUrl + itemId, this.options)
        .subscribe(data => {
          // console.log(data);
          this.list();
        });
    }
  }

  search(searchValue) {
    this.searchValue = this.searchFor;
    this.http.get(this.baseUrl, this.options).subscribe(
      (data => {
        this.items = JSON.parse(data['_body']);
        this.items = this.items.filter(item =>
          ((item.name).toLocaleLowerCase().indexOf(this.searchFor) !== -1
            || (item.url).toLocaleLowerCase().indexOf(this.searchFor) !== -1
            || (item.manufacturer).toLocaleLowerCase().indexOf(this.searchFor) !== -1));
        if (!this.items[0]) {
          this.searchSuccess = false;
        }
      }));
    this.searchSuccess = true;
  }

  sortTable(key: string) {

    if (this.lastKey === key) {
      this.multiplier *= -1;
    }
    this.items.sort((a, b): any => {
      a[key] = a[key] || '';
      b[key] = b[key] || '';
      this.lastKey = key;
      if (key === 'price') {
        return (a[key] - b[key]) * this.multiplier;
      } else {
        return a[key].localeCompare(b[key]) * this.multiplier;
      }
    });
  }

  listComments() {
    this.http.get('http://localhost:8080/comment', this.options)
      .subscribe(data => {
        this.comments = JSON.parse(data['_body']);
        // console.log(this.comments);
      });
  }

  filterCommentsByUserId(userId) {
    return this.comments.filter(comment => comment.user === userId);
  }

  filterCommentsByItemId(itemId) {
    // console.log(itemId);
    return this.comments.filter(comment => comment.item === itemId);
  }

  sendNewComment() {
    this.newComment.user['_id'] = this.loggedInUser.user['_id'];
    this.newComment.item['_id'] = this.actualItem._id;
    this.newComment.confirmed = this.isConfirmed();
    // console.log(this.newComment);
    this.http.post('http://localhost:8080/comment/', this.newComment, this.options)
      .subscribe((data) => {
        this.comments = JSON.parse(data['_body']);
        // console.log(this.comments);
      });
  }

  isConfirmed() {
    for (let i = 0; i < this.orders.length; i++) {
      for (let j = 0; j < this.orders[i].items.length; j++) {
        // tslint:disable-next-line:max-line-length
        if (this.orders[i].user['_id'] === this.newComment.user['_id'] && this.orders[i].items[j].item['_id'] === this.newComment.item['_id']) {
          return true;
        }
      }
    }
    return false;
  }

  listOders() {
    this.http.get('http://localhost:8080/order/', this.options)
      .subscribe(data => {
        this.orders = JSON.parse(data['_body']);
        // console.log(this.orders);
      });
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
  selectedItem(item) {
    this.cart = (localStorage.cartItems ? JSON.parse(localStorage.cartItems) : []);
    const find = this.cart.findIndex(i => i['_id'] === item['_id']);

    if (find !== -1) {
      this.flashMessagesService.show('A termék már szerepel a kosárban!', { cssClass: 'alert-danger' });
    } else {
      this.cart.push(item);
      this.flashMessagesService.show('A termék bekerült a kosárba!', { cssClass: 'alert-success' });
    }
    localStorage.cartItems = JSON.stringify(this.cart);
    this.getQuantity();
  }



}
