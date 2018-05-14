import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BuyersComponent } from './buyers/buyers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'buyers', component: BuyersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuyersComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    DashboardComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
