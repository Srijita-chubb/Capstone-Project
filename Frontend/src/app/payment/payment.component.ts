import { Component, OnInit } from '@angular/core';
import { payment } from 'src/Utilities/payment';
import { PaymentService } from '../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { BookserviceService } from '../services/bookservice.service';
import { movies } from 'src/Utilities/movies';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  name: string="";
  number: string="";
  type: string="";
  exp_date: string="";
  cvv: number;
  disabledValue:boolean = true;
  amount:number;
  movie:movies[]=[];
  arr:payment[]=[];

  constructor(private payservice:PaymentService, private book:BookserviceService ,private router:Router, private route:ActivatedRoute) { 

  let id:number= Number(this.route.snapshot.paramMap.get('id'));
   this.book.getSpecificMovieDetails(id).subscribe((data) => {
       this.movie[0]=data;
       console.log(this.movie[0]);       
   });
  }

  ngOnInit(): void {
    this.amount = JSON.parse(localStorage.getItem('total_amount') || '[]')
  }

  toggle(){
    this.disabledValue = false;
  }
  
  onSubmit(name: string, number: string, type: string, exp_date: string, cvv: number){
    console.log(name);
    console.log(number);
    console.log(type);
    console.log(exp_date);
    console.log(cvv);
    if(name!=="" && number!=="" && type!=="" && exp_date!=="" && cvv!==0){
      let temp:payment={P_ID:0,P_CARDHOLDER_NAME:"",P_CARD_NO:"",P_CARD_TYPE:"",P_EXPIRY:"",P_CVV:0,P_AMOUNT:0}
      temp.P_CARDHOLDER_NAME=name;
      temp.P_CARD_NO=number;
      temp.P_CARD_TYPE=type;
      temp.P_EXPIRY=exp_date;
      temp.P_CVV=cvv;
      temp.P_AMOUNT=this.amount;
      this.payservice.addPayment(temp).subscribe((data:any)=>{
        console.log(data)
      })
      this.router.navigate(['/','homepage-component']);
      Swal.fire(
        'Ticket Booked!',
        'Thanks for booking!',
        'success',
      )
    }
  }

}
