import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/users';
  users: any;
  selectedUser: any;
  newUser: any = {
    username: '',
    email: '',
    password: '',
    billingAddress: '',
    shippingAddress: '',
    phoneNumber: 0,
    role: '',
  };
  constructor(public http: Http) {
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.users = JSON.parse(data['_body']);
        console.log(this.users.length);
        console.log(this.users);
  });
  }

  editUser(user) {
    this.selectedUser = user;
    /* this.setShippingAddress(), */
    this.http.put(`http://localhost:8080/user/update/${this.selectedUser['_id']}`, this.selectedUser, this.options)
      .subscribe(data => {
        console.log(data);
        console.log(user);
        setTimeout(this.getUsers(), 300);
      });
  }

  removeUser(user) {
      this.http.delete(`http://localhost:8080/user/${user['_id']}`, this.options)
      .subscribe(data => {
        console.log(data);
        setTimeout(this.getUsers(), 300);
      });
  }
  setShippingAddress() {
    if (this.newUser.billingAddress !== undefined || this.selectedUser.billingAddress !== undefined) {
      this.newUser.shippingAddress = this.newUser.billingAddress;
      /* this.selectedUser.shippingAddress = this.selectedUser.billingAddress; */
    }
  }
  addUser() {
    this.setShippingAddress(),
    this.http.post(`http://localhost:8080/user/register`, this.newUser, this.options)
    .subscribe(data => {
      console.log(data['_body']);
      setTimeout(this.getUsers(), 300);
    });
  }

}
