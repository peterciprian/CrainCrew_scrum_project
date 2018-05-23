import { Component, OnInit, group, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
/* import { parse } from 'path'; */


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  form2: FormGroup;
  message2;
  messageClass2;
  baseUrl = 'http://localhost:8080/user/';


  user: any = {
    username: '',
    password: ''
  };
  newuser: any = {
    email: '',
    username: '',
    password: ''
  };

  registerred = false;
  longgedIn = false;
  isAdmin = false;
  public loggedInUser: any;

  public cart = JSON.parse(localStorage.getItem('cartItems')) || [];

  options = new RequestOptions({ withCredentials: true });

  constructor(
    private formBuilder: FormBuilder,
    public http: Http,
    private router: Router,
    private flashMessagesService: FlashMessagesService) {
    this.createForm();
  }

  /**
   * Bekéri a szerveről, az aktuálisan belépett user adatait
   * először az OnInit hívja meg, ill login() metódus végé is meghívjuk
   * ha nincs senki belépve, üres objectummal tér vissza
   * Ha van user, egy user objectumot ad vissza: loggedInUser változóba
   * Ha van user megnézi a role tulajdonságát, ha admin, az isAdmi változót "true"-ra állítja
  */
  isLoggedIn() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        this.loggedInUser = JSON.parse(data['_body']);
        console.log(this.loggedInUser);
        if (this.loggedInUser.user) {
          this.longgedIn = true;
          if (this.loggedInUser.user.role === 'admin') {
            this.isAdmin = true;
          }
        }
        console.log('Anyone logged in?:' + this.longgedIn);
      });
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(80),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.samePasswords('password', 'confirm') });
  }

  validateEmail(controls) {
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true };
    }
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true };
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true };
    }
  }

  samePasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'samePasswords': true };
      }
    };
  }

  login() {
    this.http.post(this.baseUrl + 'login', this.user, this.options).subscribe(data => {
      const res = data.json();

     
      console.log( data);
      if (data.ok) {
        this.flashMessagesService.show('Sikeres belépés!', { cssClass: 'alert-success' });
        this.longgedIn = true;
        console.log(data['_body']);
        this.router.navigate(['../products']);
      }
      if (res.status === 401) {
        this.flashMessagesService.show('Sikertelen belépés, ellenőrizd adataid!', { cssClass: 'alert-danger' });
      }
    });
    setTimeout(() => {
      this.isLoggedIn();
    }, 1000);
    }


  logout() {
    this.http.get(this.baseUrl + 'logout', this.options)
      .subscribe(data => {
        console.log(data['_body']);
      });
    this.flashMessagesService.show('Sikeres kilépés.', { cssClass: 'alert-success' });
    this.registerred = false;
    this.longgedIn = false;
    this.isAdmin = false;
    this.router.navigate(['home']);
  }

  register() {
    this.http.post(this.baseUrl + 'register', this.newuser, this.options).subscribe(data => {
      console.log(data.status);
      if (data.ok) {
        this.flashMessagesService.show('Sikeres regisztráció.', { cssClass: 'alert-success' });
        console.log(data['_body']);
        this.registerred = true;
      } else {
        console.log('error: ' + data.status);
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn();
  }

}
