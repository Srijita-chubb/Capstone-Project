import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookserviceService } from '../services/bookservice.service';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HomeserviceService } from '../services/homeservice.service';
import { ViewChild, AfterViewInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

const Booking_schema = [
  {
    key: 'b_NAME',
    type: 'string',
    label: 'User Name',
  },
  {
    key: 'b_MNAME',
    type: 'string',
    label: 'Movie Name',
  },
  {
    key: 'b_PHONE',
    type: 'string',
    label: 'Phone Number',
  },
  {
    key: 'b_DATE',
    type: 'string',
    label: 'Booking Date',
  },
  {
    key: 'b_TIMING',
    type: 'string',
    label: 'Timing',
  },
  {
    key: 'b_TICKETS',
    type: 'number',
    label: 'No.of tickets',
  },
];
@Component({
  selector: 'app-gridcomponent',
  templateUrl: './gridcomponent.component.html',
  styleUrls: ['./gridcomponent.component.css']
})
export class GridcomponentComponent implements OnInit, AfterViewInit {
  arr:any=[];
  init:boolean=true;
  isError :boolean = false
  displayedColumns: string[] = Booking_schema.map((col) => col.key);
  dataSource = new MatTableDataSource();
  columnsSchema: any = Booking_schema;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private homeserviceobj:HomeserviceService, private bookserviceobj:BookserviceService, private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource.data = JSON.parse(localStorage.getItem('booking_list') || '[]')
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  

  ngOnInit(): void {
    // this.fetchAllMovies();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  // fetchAllMovies() {
  //   this.homeserviceobj.getAllMovies().subscribe((response) => {
  //     this.arr = response;
  //     if(this.arr.length >0){
  //       this.init = false;
  //     }
  //   })
  // }
//   confirm(edit:any)
//   {
//     let applicationData = JSON.parse(localStorage.getItem('users') || '[]')
//     this.arr = this.arr.map((movie:any,i:any)=>{
//       if(movie.name == edit.movieName)
//       {
//        applicationData.map((original:any)=>{
//         if(edit.user_number == original.user_number)
//         {
//           console.log(edit.user_seat,original.user_seat)
//           movie.tickets[parseInt(edit.user_time)] = movie.tickets[parseInt(edit.user_time)]-edit.user_seat+original.user_seat;
//         }
//         return original;
//        })
//         if(edit.user_seat!=0)
//         {
//           this.editHandler(movie)
//         }
//         else{
//           this.isError = true
//         }
//       }
//       return movie
//     })
//     if(!this.isError)
//       localStorage.setItem('users',JSON.stringify(this.dataSource.data))
//     else
//     {
//       this.dataSource.data = applicationData
//       this.isError = false
//     }
//   }
//   editHandler(movie:any) {
//     console.log(movie)
//     this.bookserviceobj.updateData(movie.tickets,movie.id).subscribe()
//   }
 }



