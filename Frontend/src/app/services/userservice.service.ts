import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/Utilities/constant';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { user } from 'src/Utilities/user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private httpclient:HttpClient) { }

  addUser(user:user): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    console.log(body)
    return this.httpclient.post(constant.postUser.toString(),body,{'headers':headers});
  }

  getAllUsers(): Observable<user[]> {
    return this.httpclient
      .get<user[]>(constant.getUser.toString())
      .pipe(retry(1), catchError(this.handleError));

  }
  handleError(er: any) {
    return throwError(() => {
      console.log(er);
    });
  }
}
