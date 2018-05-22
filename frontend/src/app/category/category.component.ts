import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  options = new RequestOptions({ withCredentials: true });

  baseUrl = 'http://localhost:8080/categ/';
  categs: Array<any>;
  actualCateg = {
    _id: '',
    name: '',
    user: '',
    sequence: '',
    updatedAt: Date
  };

  categ = {
    name: '',
    user: '',
    sequence: ''
  };

  registerred = false;
  longgedIn = false;
  isAdmin = false;
  loggedInUser: any;

  myForm: FormGroup;

  constructor(public http: Http) {
    this.list();
    this.myForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      'sequence': new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(99),
      ])
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
        console.log('Anyone logged in? - Categ component:' + this.longgedIn);
        console.log('Is admin:' + this.isAdmin);
      });
  }

  list() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.categs = JSON.parse(data['_body']);
      });
  }

  create() {
    this.categ.user = this.loggedInUser.user._id;
    console.log(this.categ);
    this.http.post(this.baseUrl, this.categ, this.options)
      .subscribe(data => {
        console.log(data);
        this.categ = {
          name: '',
          user: '',
          sequence: ''
        };
        this.list();
        this.myForm.reset();
      });
  }

  update() {
    this.http.put(this.baseUrl + this.actualCateg['_id'], this.actualCateg, this.options)
      .subscribe(data => {
        console.log(data);
        setTimeout(() => {
          this.list();
        }, 1000);

      });
  }

  delete(categId) {
    if (confirm('Really?')) {
      this.http.delete(this.baseUrl + categId, this.options)
        .subscribe(data => {
          console.log(data);
          this.list();
        });
    }
  }

  modalChange(id) {
    const choosen = this.categs.filter(categ => categ._id === id)[0];
    this.actualCateg = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
  }

  ngOnInit() {
    this.isLoggedIn();
  }

}
