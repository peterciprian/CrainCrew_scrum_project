import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';

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
    username: 'oberthzsigmond@gmail.com',
    password: '012345678'
};
options = new RequestOptions({ withCredentials: true });

  constructor( private formBuilder: FormBuilder, public http: Http) { this.createForm(); }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
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
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true }
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true }
    }
  }

  samePasswords(password, confirm) {
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return {'samePasswords': true}
      }
    }
  }

  login() {
    this.http.post(this.baseUrl + 'login', this.user, this.options)
        .subscribe(data => {
            console.log(data['_body']);
        });
}
logout() {
  this.http.get(this.baseUrl + 'logout', this.options)
      .subscribe(data => {
          console.log(data['_body']);
      });
}

  ngOnInit() {
  }

}
