import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { movies } from 'src/Utilities/movies';
import { constant } from 'src/Utilities/constant';
import { booking } from 'src/Utilities/booking';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  body: any;
  message:string="";
  constructor(private httpClient: HttpClient) { }
  setMessage(data:any){
    this.message = data;
  }
  getMessage(){
    return this.message;
  }

  getAllBooking(): Observable<booking[]> {
    return this.httpClient
      .get<booking[]>(constant.getBooking.toString())
      .pipe(retry(1), catchError(this.handleError));
  }
  handleError(err: any){
    return throwError(() =>{
      console.log((err));
    })
  }

  getSpecificMovieDetails(id:number)
  {
    return this.httpClient
    .get<movies>(`${constant.getSpecificMovie}${id}`)
    .pipe(retry(1), catchError(this.handleError));
  }

  upadteMovie(movie:movies)

  {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(movie);
    console.log(body);
    return this.httpClient.put(constant.updateMovieTicket.toString(),body,{'headers':headers});
  }


  addBooking(book:booking): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(book);
    console.log(body)
    return this.httpClient.post(constant.postBooking.toString(),body,{'headers':headers});
  }
}
