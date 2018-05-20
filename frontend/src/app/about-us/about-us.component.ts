import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  title = 'Itt megtalálsz bennünket';
  lat = -27.978087;
  lng = 153.428557;
  mailform = {
    from: '',
    to: 'cranecrew.zsiga@gmail.com',
    subject: '',
    body: '',
  };
  constructor() { }

  ngOnInit() {
  }

  sendmailform() {
    console.log('object');
  }
}
