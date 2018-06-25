import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  baseUrl = 'http://localhost:8080/user/';
  options = new RequestOptions({ withCredentials: true });
  currentUser = null;
  title = 'Itt megtalálsz bennünket';
  lat = -27.978087;
  lng = 153.428557;
  mailform = {
    from: '',
    to: '',
    subject: '',
    html: '',
  };
  constructor(public http: Http,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        // console.log(data['_body']);
        if (data.ok) {
          this.currentUser = JSON.parse(data['_body']);
          this.currentUser = this.currentUser.user.email;
          // console.log(this.currentUser);
          this.mailform.from = this.currentUser;
          // console.log(this.mailform.from);
        }
      });
  }

  sendmailform() {
    this.http.post('http://localhost:8080/sendemail', this.mailform).subscribe(data => {
      // console.log(data);
    });
    this.flashMessagesService.show('Email elküldve.', { cssClass: 'alert-success' });
  }
}

