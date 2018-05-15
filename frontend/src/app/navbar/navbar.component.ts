import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';


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
    email : '',
    username: '',
    password: ''
};

options = new RequestOptions({ withCredentials: true });

  constructor( 
    private formBuilder: FormBuilder,
    public http: Http,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { this.createForm(); }

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
    }, {validator: this.samePasswords('password', 'confirm')})
  }

  validateEmail(controls) {
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
        return {'samePasswords': true}
      }
    };
  }

  login() {
    this.http.post(this.baseUrl + 'login', this.user, this.options)
        .subscribe(data => {
            console.log(data['_body']);
        });
    this.flashMessagesService.show('Sikeres belépés.', { cssClass: 'alert-success' });
}
  logout() {
    this.http.get(this.baseUrl + 'logout', this.options)
        .subscribe(data => {
            console.log(data['_body']);
        });
    this.flashMessagesService.show('Sikeres kilépés.', { cssClass: 'alert-success' });
}

register() {
  this.http.post(this.baseUrl + 'register', this.newuser, this.options).subscribe(data => {
    console.log(data['_body']);
});
this.flashMessagesService.show('Sikeres regisztráció.', { cssClass: 'alert-success' });
}

  ngOnInit() {
  }

}
