import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookserviceService } from '../services/bookservice.service';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HomeserviceService } from '../services/homeservice.service';
import { ViewChild, AfterViewInit } from '@angular/core';

const Booking_schema = [
  {
    key: 'm_NAME',
    type: 'text',
    label: 'Movie Name',
  },
  {
    key: 'm_IMAGE',
    type: 'string',
    label: 'Image',
  },
  {
    key: 'm_DESC',
    type: 'string',
    label: 'Description',
  },
  {
    key: 'm_RATING',
    type: 'string',
    label: 'Rating',
  },
  {
    key: 'morN_SEATS',
    type: 'string',
    label: 'Morning Seats',
  },
  {
    key: 'nooN_SEATS',
    type: 'string',
    label: 'Noon Seats',
  },
  {
    key: 'nighT_SEATS',
    type: 'string',
    label: 'Night Seats',
  },
  {
    key: 'm_PRICE',
    type: 'number',
    label: 'Price',
  },
];

@Component({
  selector: 'app-editmovies',
  templateUrl: './editmovies.component.html',
  styleUrls: ['./editmovies.component.css']
})
export class EditmoviesComponent implements OnInit, AfterViewInit {
  arr:any=[];
  init:boolean=true;
  isError :boolean = false
  displayedColumns: string[] = Booking_schema.map((col) => col.key);
  dataSource = new MatTableDataSource();
  columnsSchema: any = Booking_schema;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { 
    this.dataSource.data = JSON.parse(localStorage.getItem('movie_list') || '[]')
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
