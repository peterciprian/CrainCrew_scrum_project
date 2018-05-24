import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Item } from '../item';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/item/';
  items: Array<Item>;

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

  cart = [];
  registerred = false;
  longgedIn = false;
  isAdmin = false;
  loggedInUser: any;


  categs: Array<any>;
  categ = {
    name: '',
    user: '',
    sequence: ''
  };


  ngOnInit() {
    this.listCateg();
    this.list();
    this.isLoggedIn();
  }

  constructor(
    public http: Http,
    private flashMessagesService: FlashMessagesService) {
  }

  list() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']).reverse();
      });
  }

  list2() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        const tempSort = JSON.parse(data['_body']);
        tempSort.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          } else {
            return 0;
          }
        });
        this.items = tempSort;
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

modalChange(id) {
  const choosen = this.items.filter(item => item._id === id)[0];
  this.actualItem = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
}

selectedItem(item) {
  this.cart = (localStorage.cartItems ? JSON.parse(localStorage.cartItems) : []);
  const find = this.cart.findIndex(i => i['_id'] === item['_id']);

  if (find !== -1) {
      this.flashMessagesService.show('A termék már szerepel a kosárban!', { cssClass: 'alert-danger' });
    } else {this.cart.push(item);
  this.flashMessagesService.show('A termék bekerült a kosárba!', { cssClass: 'alert-success' }); }
  localStorage.cartItems = JSON.stringify(this.cart);
}

showSelectedTable(categ) {
  this.http.get(this.baseUrl, this.options)
  .subscribe(data => {
    this.items = JSON.parse(data['_body']).filter(item => item.category === categ);
  });
}

}

