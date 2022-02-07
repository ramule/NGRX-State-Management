import { Injectable } from "@angular/core";

@Injectable({
  'providedIn': 'root'
})
export class AppConstants {
  baseUrl = "https://jsonplaceholder.typicode.com/";

  serviceName_getUsers = "users";
}
