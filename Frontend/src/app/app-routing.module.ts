import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { GridcomponentComponent } from './gridcomponent/gridcomponent.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { TicketComponent } from './ticket/ticket.component';
import { PaymentComponent } from './payment/payment.component';
import { EditmoviesComponent } from './editmovies/editmovies.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { PaycheckComponent } from './paycheck/paycheck.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'adminhome', component: AdminHomeComponent },
  { path: 'homepage-component', component: HomepageComponent },
  { path: 'booking-component/:id', component: BookingComponent},
  { path: 'ticket-component', component: TicketComponent},
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'gridcomponent', component: GridcomponentComponent },
  { path: 'addmovie', component: AddmovieComponent},
  { path: 'editmovies', component:EditmoviesComponent },
  { path: 'paycheck', component: PaycheckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
