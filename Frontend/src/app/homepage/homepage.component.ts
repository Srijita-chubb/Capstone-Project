import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeserviceService } from '../services/homeservice.service';
import { movies } from 'src/Utilities/movies';
import { UserserviceService } from '../services/userservice.service';
import { user } from 'src/Utilities/user';
import { payment } from 'src/Utilities/payment';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  arr:movies[] = [];
  arr1:user[] = [];
  arr2:payment[] = [];
  i:any;
  init:boolean=true;
  constructor(private router:Router,private homeserviceobj:HomeserviceService, private uservice:UserserviceService) { }

  ngOnInit(): void {
    this.homeserviceobj.getAllMovies().subscribe((response) => {
      console.log(response,'home')
      this.arr = response;
      if(this.arr.length >0){
        this.init = false;
      }
      localStorage.setItem('movie_list',JSON.stringify(this.arr))
    })
    this.uservice.getAllUsers().subscribe((response:any) => {
      console.log(response,'home')
      this.arr1 = response;
      localStorage.setItem('user_list',JSON.stringify(this.arr1))
    })
  }
  goTo(id:number,data:any)
  {
    console.log(data)
    this.router.navigate(['booking-component/'+id], { state: { data} })
  }

}
