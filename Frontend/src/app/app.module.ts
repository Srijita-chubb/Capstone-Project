import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridcomponentComponent } from './gridcomponent/gridcomponent.component';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TicketComponent } from './ticket/ticket.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PaymentComponent } from './payment/payment.component';
import { EditmoviesComponent } from './editmovies/editmovies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { PaycheckComponent } from './paycheck/paycheck.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BookingComponent,
    LoginComponent,
    GridcomponentComponent,
    TicketComponent,
    AdminHomeComponent,
    PaymentComponent,
    EditmoviesComponent,
    AddmovieComponent,
    PaycheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
