import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 // ebből kapjuk meg elvileg az items táblánkat, ráadásul JSON-ben
 // 'mongoexport -h ds119150.mlab.com:19150 -d crane-crew -c items -u crane-crew -p crane-crew -o items.json'
 // csak még nem jöttem rá hogyan, lehet kell valami npm csomag hozzá
 // (nem találtam olyat, aminek a használatatát is értettem volna)
 constructor() {}

  ngOnInit() {
  }

}
