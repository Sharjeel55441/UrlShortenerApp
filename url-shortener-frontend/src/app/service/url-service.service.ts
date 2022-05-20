import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {
  public baseUrl="https://localhost:5000/api/"
  constructor(private http:HttpClient) { }
   postUrl(data:any) {
    this.http.post(this.baseUrl,data);
  }
}
