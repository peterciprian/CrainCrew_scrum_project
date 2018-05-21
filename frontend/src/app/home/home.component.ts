import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Item } from '../item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/item/';
  items: Array<Item>;

  item: Item = {
    name: '',
    url: '',
    img: '',
    manufacturer: '',
    price: 0,
    category: '',
  };


  registerred = false;
  longgedIn = false;
  isAdmin = false;
  loggedInUser: any;


  ngOnInit() {
    this.list();
    this.isLoggedIn();
    // this.sortTable('createdAt');
    // this.items.splice(10);
  }

  constructor(
    public http: Http) {
  }

  list() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
      });
  }

  sortTable(key: string) {
    this.items.sort((a, b): any => {
      a[key] = a[key] || '';
      b[key] = b[key] || '';
      return a[key].localeCompare(b[key]);
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

}
