import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private appConstants: AppConstants) { }

  getResponse(url: string, params?: any): Observable<any>{
    const data = {params};
    return this.httpClient.get(this.appConstants.baseUrl + url, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  errorHandler(res: any) {
    console.log("ErrorResponse: ", res);
    const error = res.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];

    if(error[key] instanceof Array) {
      message = error[key][0];
    }

    if(key == "isTrusted") {

    }
    else {
      message = key + ": " + message;
    }

    console.log('Error: ', error);
    console.log('Message: ', message);
    return throwError({messages : message, error: res});
  }
}
