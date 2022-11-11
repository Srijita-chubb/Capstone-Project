import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movies } from 'src/Utilities/movies';
import { constant } from 'src/Utilities/constant';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

  constructor(private httpclient:HttpClient) { }

  getAllMovies(): Observable<movies[]> {
    return this.httpclient
      .get<movies[]>(constant.getAllMovies.toString())
      .pipe(retry(1), catchError(this.handleError));
  }
  handleError(er: any) {
    return throwError(() => {
      console.log(er);
    });
  }

  addMovies(pay:movies): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pay);
    console.log(body)
    return this.httpclient.post(constant.postMovie.toString(),body,{'headers':headers});
  }


}
