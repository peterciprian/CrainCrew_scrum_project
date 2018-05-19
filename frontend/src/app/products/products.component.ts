import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ItemCrudService } from '../item-crud.service';
import { Item } from '../item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  options = new RequestOptions({ withCredentials: true });
  // baseUrl = 'https://api.mlab.com/api/1/databases/crane-crew/collections/items/?apiKey=IM0DBPnVxrZDK4-YxGS0hxzTSXVbKRED';
  baseUrl = 'http://localhost:8080/item/';
  items: Array<Item>;
  actualItem: Item = {
    _id: '',
    name: '',
    url: '',
    img: '',
    manufacturer: '',
    price: 0
  };

  item: Item = {
    name: '',
    url: '',
    img: '',
    manufacturer: '',
    price: 0
  };

  showThumbnail = true;

  searchValue = '';
  searchSuccess = true;
  searchFor: string;

  lastKey = '';
  multiplier = 1;


  ngOnInit() {
  }

  constructor(public http: Http) { this.list(); }

  showThumbnailSwitch() {
    this.showThumbnail = true;
    this.list();
  }

  showList() {
    this.showThumbnail = false;
    this.list();
  }

  list() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
      });
  }

  find(itemId) {
    this.http.get(this.baseUrl + itemId, this.options)
      .subscribe(data => {
        this.items = JSON.parse(data['_body']);
        console.log(this.items);
      });
  }

  create() {
    console.log(this.item);
    this.http.post(this.baseUrl, this.item, this.options)
      .subscribe(data => {
        console.log(data);
        this.item = {
          name: '',
          url: '',
          img: '',
          manufacturer: '',
          price: 0
        };
        this.list();
      });
  }

  modalChange(id) {
    const choosen = this.items.filter(item => item._id === id)[0];
    this.actualItem = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
  }

  /**
   * Ha van új link megadva: newImg, létrehoz egy oldImg tulajdonségot
   * ami megkapja az eredeti img
   */
  update() {
    if (this.actualItem.oldImg) {
      delete this.actualItem.oldImg;
    }

    if (this.actualItem.newImg) {
      this.actualItem.oldImg = this.actualItem.img; 
      this.actualItem.img = this.actualItem.newImg;
      delete this.actualItem.newImg;
    }
/*
    if (this.actualItem.img !== '' && this.actualItem.img && this.actualItem.img !== ' ') {
      this.actualItem.oldImg = this.actualItem.img;
      this.actualItem.img = this.actualItem.newImg;
      delete this.actualItem.newImg;
    }*/
    this.http.put(this.baseUrl + this.actualItem['_id'], this.actualItem, this.options)
      .subscribe(data => {
        console.log(data);
        this.list();
      });
  }


  delete(itemId) {
    if (confirm('Really?')) {
      this.http.delete(this.baseUrl + itemId, this.options)
        .subscribe(data => {
          console.log(data);
          this.list();
        });
    }
  }

  search(searchValue) {
    this.searchValue = this.searchFor;
    this.http.get(this.baseUrl, this.options).subscribe(
      (data => {
        this.items = JSON.parse(data['_body']);
        this.items = this.items.filter(item =>
          ((item.name).toLocaleLowerCase().indexOf(this.searchFor) !== -1
          || (item.url).toLocaleLowerCase().indexOf(this.searchFor) !== -1
          || (item.manufacturer).toLocaleLowerCase().indexOf(this.searchFor) !== -1));
        if (!this.items[0]) {
          this.searchSuccess = false;
        }
      }));
    this.searchSuccess = true;
  }

  sortTable(key: string) {

    if (this.lastKey === key) {
      this.multiplier *= -1;
      }
    this.items.sort((a , b): any => {
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


}
