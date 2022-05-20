import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-url-shortner',
  templateUrl: './url-shortner.component.html',
  styleUrls: ['./url-shortner.component.css']
})
export class UrlShortnerComponent implements OnInit {
  public url ={
    fullUrl:''
  }
  getId:any;
  getShortUrl:any;
  link:any;
  public loader:boolean = false;
  constructor(private service:HttpService) { }
  ngOnInit(): void {

  }
  public onSendRequest(): void {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Saved Your URL successfully'
    })
    this.loader = true;
    localStorage.setItem('url',this.url.fullUrl);
    this.service.postUrl(this.url).subscribe((res:any) => {
      this.getId = res.url["shortUrl"];
    });
    setTimeout(() => {
      this.service.getShortUrl(this.getId).subscribe((short: any) => {
        this.getShortUrl = short["result"];
        this.loader = false
      })
    },3000);

  }
}
