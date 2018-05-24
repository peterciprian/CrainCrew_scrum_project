import { Component, OnInit, group } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  orders: any;
  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';
  baseUrlOrders = 'http://localhost:8080/order/';
  loggedInUser: any;
  longgedIn = false;
  lastKey = '';
  multiplier = 1;
  setPassword: Object = {
    oldPassword: '',
    newPassword: '',
    newPassword2: ''
  };
  constructor(
    public http: Http,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {
    this.isLoggedIn();
    this.listOrders();
  }

  listOrders() {
    this.http.get(this.baseUrlOrders, this.options).subscribe(data => {
      this.orders = JSON.parse(data['_body']);
      // console.log(this.orders);
    });
  }

  editUser(user) {
    this.loggedInUser = user;
    this.http
      .put(
        `http://localhost:8080/user/update/${this.loggedInUser['_id']}`,
        this.loggedInUser,
        this.options
      )
      .subscribe(data => {
        // console.log(data);
      });
  }

  isLoggedIn() {
    this.http.get(this.baseUrl + 'profile', this.options).subscribe(data => {
      this.loggedInUser = JSON.parse(data['_body']);
      // console.log(this.loggedInUser);
      if (this.loggedInUser.user) {
        this.longgedIn = true;
      }
      // console.log('Anyone logged in?:' + this.longgedIn);
    });
  }

  sortTable(key: string) {

    if (this.lastKey === key) {
      this.multiplier *= -1;
    }
    this.orders.sort((a, b): any => {
      a[key] = a[key] || '';
      b[key] = b[key] || '';
      this.lastKey = key;
      if (key === 'price') {
        return a[key] > (b[key]) * this.multiplier;
      } else {
        return a[key].localeCompare(b[key]) * this.multiplier;
      }
    });
  }
  updatePassword() {
    if (this.setPassword['newPassword'] === this.setPassword['newPassword2'] && this.setPassword['newPassword'].length > 8) {
      // console.log(this.loggedInUser.user['_id']);
      this.http.post(`http://localhost:8080/user/change/${this.loggedInUser.user['_id']}`, this.setPassword, this.options)
        .subscribe(data => {
          if (data.ok === true) {
            // console.log('success', 'Sikeres jelszómódosítás');
            this.flashMessagesService.show('Sikeres jelszó módosítás.', { cssClass: 'alert-success' });
          } else {
            // console.log('error');
            this.flashMessagesService.show('Sikertelen jelszó módosítás.', { cssClass: 'alert-danger' });
          }
        }, error => {
          // console.log('upsz');
          this.flashMessagesService.show('Sikertelen jelszó módosítás.', { cssClass: 'alert-danger' });
        });
    } else { this.passwordValidationError(); }
  }

  passwordValidationError() {
    // console.log('Something bad happened');
}

  ngOnInit() { this.listOrders(); }
}
