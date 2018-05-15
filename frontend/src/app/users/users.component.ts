import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<any>;

  user = {
    username: '',
    email: '',
    password: ''
  };

  modal:{
    username: '',
    email: '',
    password: ''
  };

  url = 'http://localhost:8080/user/';

  constructor(public http: HttpClient) {
    this.getAll();
  }

  // feltölti a entries változót a szerverről kapott adatokkal
  getAll() {
    this.http.get(this.url + 'users/').subscribe(
      (data: any) => {
        this.users = data;
        console.log(this.users);
      }
    );
  }

  
  modalChange(id) {
    const choosen = this.users.filter(user => user._id === id)[0];
    this.modal = Object.assign({}, choosen); 
  }

  delete(id) {
    if (confirm('Really?')) {
      this.http.delete(this.url + id)
        .subscribe(
          (data) => {
            this.getAll();
          }
        );
    }
  }

  ngOnInit() {
  }
}