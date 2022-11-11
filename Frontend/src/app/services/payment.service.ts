import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/Utilities/constant';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { payment } from 'src/Utilities/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpclient:HttpClient) { }

  addPayment(pay:payment): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pay);
    console.log(body)
    return this.httpclient.post(constant.postPayment.toString(),body,{'headers':headers});
  }

  getAllPayment(): Observable<payment[]> {
    return this.httpclient
      .get<payment[]>(constant.getPayment.toString())
      .pipe(retry(1), catchError(this.handleError));
  }
  handleError(er: any) {
    return throwError(() => {
      console.log(er);
    });
  }
}
