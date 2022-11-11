import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';

const Booking_schema = [
  {
    key: 'p_CARDHOLDER_NAME',
    type: 'string',
    label: 'CardHolder Name',
  },
  {
    key: 'p_CARD_NO',
    type: 'string',
    label: 'Card Number',
  },
  {
    key: 'p_CARD_TYPE',
    type: 'string',
    label: 'Card Type',
  },
  {
    key: 'p_CVV',
    type: 'number',
    label: 'Card CVV',
  },
  {
    key: 'p_EXPIRY',
    type: 'string',
    label: 'Card Expiry',
  },
  {
    key: 'p_AMOUNT',
    type: 'number',
    label: 'Amount Paid',
  },
];


@Component({
  selector: 'app-paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.css']
})
export class PaycheckComponent implements OnInit, AfterViewInit {
  arr:any=[];
  init:boolean=true;
  isError :boolean = false
  displayedColumns: string[] = Booking_schema.map((col) => col.key);
  dataSource = new MatTableDataSource();
  columnsSchema: any = Booking_schema;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.dataSource.data = JSON.parse(localStorage.getItem('payment_list') || '[]')
   }
   ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
