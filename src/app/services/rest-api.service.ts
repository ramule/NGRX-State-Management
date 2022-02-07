import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { HttpService } from './http.service';
import { User } from '../Models/User.model';
import { Post } from '../Models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpService: HttpService, private appConstants: AppConstants) { }

  getUsers(): Observable<User[]> {
    return this.httpService.getResponse(this.appConstants.serviceName_getUsers).pipe(map(data => data as User[]));
  }

  getUser(id: number): Observable<User> {
    console.log("id: ", id);
    return this.httpService.getResponse(this.appConstants.serviceName_getUsers + '/' + id);
  }

  getPosts(): Observable<Post[]> {
    const data: Post[] = [
      {
        "id": 1,
        "title": "post 1",
        "comments": [
          {
            "id": 101,
            "description": "This is first post first comment"
          },
          {
            "id": 102,
            "description": "This is first post second comment"
          }
        ]
      },
      {
        "id": 2,
        "title": "post 2",
        "comments": [
          {
            "id": 103,
            "description": "This is second post first comment"
          },
          {
            "id": 104,
            "description": "This is second post second comment"
          }
        ]
      }
    ];

    return new Observable(observer => {
      observer.next(data);
    });
  }
}
