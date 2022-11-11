import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookserviceService } from '../services/bookservice.service';
import { movies } from 'src/Utilities/movies';
import { booking } from 'src/Utilities/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  product: any;
  data: any;
  var1: string = "";
  var2: number = 0;
  var3: any;
  seatIndex: number = 0;
  seatIndex2: number = -1;
  seatReq: number;
  phone: string = "";
  bookdate: string = "";
  totalSeats: number = 0;
  availableSeats: string = "";
  disabledValue: boolean = true;
  user:any = {};
  allbookings:any = [];
  movie:movies[]=[];
  amount:number;

  constructor(private router: Router, private book: BookserviceService,private route:ActivatedRoute) { 
    this.product = router.getCurrentNavigation()?.extras.state;
    this.data = this.product.data;
    // console.log(this.data);
   
   let id:number= Number(this.route.snapshot.paramMap.get('id'));
   this.book.getSpecificMovieDetails(id).subscribe((data) => {
       this.movie[0]=data;
       console.log(this.movie[0]);
       
   });


  }

  ngOnInit(): void {
    console.log(this.var1);
    this.book.setMessage(this.var1);
  }

  
  onChange(event: any):void{
    this.seatIndex = parseInt(event.target.value);
    console.log(this.seatIndex);
    if(this.seatIndex==0){
      this.availableSeats=this.movie[0].morN_SEATS;
      console.log(this.availableSeats);
    }
    else if(this.seatIndex==1){
      this.availableSeats=this.movie[0].nooN_SEATS;
      console.log(this.availableSeats);
    }
    else{
      this.availableSeats=this.movie[0].nighT_SEATS;
      console.log(this.availableSeats);
    }
  }

  toggle(){
    this.disabledValue = false;
  }

  // onSubmit(data:any = {}){ 
  //   // data["movieName"] = this.data.name;
  //   // this.data.tickets[this.seatIndex]-=this.seatReq;
  //   // console.log(this.data.tickets);
  //   // this.addUser(data);
  //   // console.log(data);
  // } 

  onSubmit(name: string,m_name: string, phone: string, bookdate: string, timing: number, reqSeat: number){
    console.log("bbbb");
    if(name!=="" && m_name!=="" && phone!=="" && bookdate!=="" && reqSeat!==0){
      let temp:booking={b_ID:0,b_NAME:"",b_MNAME:"",b_PHONE:"",b_DATE:"",b_TIMING:"",b_TICKETS:0}
      temp.b_NAME=name;
      temp.b_MNAME=m_name;
      temp.b_PHONE=phone;
      temp.b_DATE=bookdate;
      if(timing == 0){
        temp.b_TIMING="Morning";
      }
      else if(timing == 1){
        temp.b_TIMING="Noon";
      }
      if(timing == 2){
        temp.b_TIMING="Night";
      }
      temp.b_TICKETS=reqSeat;
      console.log(temp);
      this.book.addBooking(temp).subscribe((data:any)=>{
        console.log(data)
      })
    }
  }

  // addUser(user:any){

  //   this.allbookings = JSON.parse(localStorage.getItem('users') || '[]')
  //     this.allbookings.push(user)
  //     localStorage.setItem('users',JSON.stringify(this.allbookings))

  // }
  submit(seats:number,movie_index:number)
  {

    console.log("aaaaaaaa");
    this.amount=this.movie[0].m_PRICE * seats;
    console.log(this.amount);
    console.log(seats);
    localStorage.setItem('total_amount',JSON.stringify(this.amount));
    if(movie_index==0){
     
      let temp:number=Number(this.movie[0].morN_SEATS)-seats;
      this.movie[0].morN_SEATS=temp.toString();
      console.log(this.movie[0]);
      this.book.upadteMovie(this.movie[0]).subscribe(x=>x=x);
    }
    else if(movie_index==1){
      let temp:number=Number(this.movie[0].nooN_SEATS)-seats;
      this.movie[0].nooN_SEATS=temp.toString();
      this.book.upadteMovie(this.movie[0]).subscribe(x=>x=x);
    }
    else{
      let temp:number=Number(this.movie[0].nighT_SEATS)-seats;
      this.movie[0].nighT_SEATS=temp.toString();
      this.book.upadteMovie(this.movie[0]).subscribe(x=>x=x);
    }

  }

  goTo(id:number,data:any)
  {
    console.log(data)
    this.router.navigate(['payment/'+id], { state: { data} })
  }
}
