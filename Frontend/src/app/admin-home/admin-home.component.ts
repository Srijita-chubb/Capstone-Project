import { Component, OnInit } from '@angular/core';
import { BookserviceService } from '../services/bookservice.service';
import { PaymentService } from '../services/payment.service';
import { booking } from 'src/Utilities/booking';
import { payment } from 'src/Utilities/payment';
import { movies } from 'src/Utilities/movies';
import { HomeserviceService } from '../services/homeservice.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private book:BookserviceService, private payservice:PaymentService, private homeserviceobj:HomeserviceService) { }
  arr:movies[]=[];
  arr1:payment[]=[];
  arr2:booking[]=[];

  ngOnInit(): void {
    this.homeserviceobj.getAllMovies().subscribe((response) => {
      console.log(response,'home')
      this.arr = response;
      localStorage.setItem('movie_list',JSON.stringify(this.arr))
    })

    this.payservice.getAllPayment().subscribe((response:any) => {
      console.log(response,'home')
      this.arr1 = response;
      localStorage.setItem('payment_list',JSON.stringify(this.arr1))
    })

    this.book.getAllBooking().subscribe((response:any) => {
      console.log(response,'home')
      this.arr2 = response;
      localStorage.setItem('booking_list',JSON.stringify(this.arr2))
    })
  }

}
