import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrdersComponent, TotalPipe } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    DashboardComponent,
    NotFoundComponent,
    HomeComponent,
    AboutUsComponent,
    TotalPipe,
    CartComponent,
    CheckoutComponent,
    CategoryComponent,
    ProfileComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3Me_Mi8SqrA9OGTW8Q7AEMqTzfwcbM-w'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
