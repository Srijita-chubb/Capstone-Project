import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { movies } from 'src/Utilities/movies';
import { HomeserviceService } from '../services/homeservice.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  name: string="";
  desc: string="";
  image: string="";
  rating: string="";
  m_seats: string="";
  n_seats: string="";
  e_seats: string="";
  price: number;

  constructor(private router:Router, private homeobj:HomeserviceService) { }
  arr:movies[]=[];

  ngOnInit(): void {
  }

  onSubmit(name: string, desc: string, image: string, rating: string, m_seats: string, n_seats:string, e_seats: string, price: number){
    // console.log(name);
    // console.log(number);
    // console.log(type);
    // console.log(exp_date);
    // console.log(cvv);
    if(name!=="" && desc!=="" && image!=="" && rating!=="" && m_seats!=="" && n_seats!=="" && e_seats!=="" && price!==0){
      let temp:movies={m_ID:0,m_NAME:"",m_DESC:"",m_IMAGE:"",m_RATING:"",morN_SEATS:"",nooN_SEATS:"",nighT_SEATS:"",m_PRICE:0}
      temp.m_NAME=name;
      temp.m_DESC=desc;
      temp.m_IMAGE=image;
      temp.m_RATING=rating;
      temp.morN_SEATS=m_seats;
      temp.nooN_SEATS=n_seats;
      temp.nighT_SEATS=e_seats;
      temp.m_PRICE=price;
      this.homeobj.addMovies(temp).subscribe((data:any)=>{
        console.log(data)
      })
      this.router.navigate(['/','adminhome']);
      Swal.fire(
        'Movie Added!',
        'Thanks',
        'success',
      )
    }
  }

}
