import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Http, Headers, Response, RequestOptions } from "@angular/http";

@Component({
  selector: "app-selectproduct",
  templateUrl: "./selectproduct.component.html",
  styleUrls: ["./selectproduct.component.css"]
})
export class SelectproductComponent implements OnInit {
  selectedProduct = {
    _id: "",
    name: '',
    img: '',
    manufacturer: '',
    price: '',
    category: ''
  };
  id: any;
  options = new RequestOptions({ withCredentials: true });
  error = false;
  constructor(private route: ActivatedRoute, public http: Http) {
    this.route.params.subscribe(params => {
      this.id = params;
    });
  }
  navigate() {
    this.http
      .get('http://localhost:8080/item/' + this.id, this.options)
      .subscribe(data => {
        const body = JSON.parse(data['_body']);
        this.selectedProduct = body;
        if (body == null || body.error) {
          this.error = true;
        }
      });
  }
  ngOnInit() {}
}
