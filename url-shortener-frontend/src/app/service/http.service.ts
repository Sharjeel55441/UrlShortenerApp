import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
public baseUrl="http://localhost:5000/api/"
  constructor(private http:HttpClient) { }
  postUrl(data:any):Observable<any> {
   return this.http.post(`${this.baseUrl}`,data);
  };
  public getShortUrl(id:any):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}url/${id}`);
  }
}
