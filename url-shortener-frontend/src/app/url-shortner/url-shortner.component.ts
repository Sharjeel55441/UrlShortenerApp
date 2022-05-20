import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import Swal from 'sweetalert2';
import {NgTinyUrlService} from 'ng-tiny-url';
import { concatMap, delay, Observable, of } from 'rxjs';
@Component({
  selector: 'app-url-shortner',
  templateUrl: './url-shortner.component.html',
  styleUrls: ['./url-shortner.component.css']
})
export class UrlShortnerComponent implements OnInit {
  public url ={
    fullUrl:''
  }
  public getId:any;
  public getShortUrl:any;
  public urlId:any;
  public loader:boolean = false;
  constructor(private service:HttpService , private tinyService:NgTinyUrlService) { }
  ngOnInit(): void {

  }
  public onSendRequest(url: any): void {

    if (url.valid) {
    this.loader = true;
    localStorage.setItem('url',this.url.fullUrl);
    this.tinyService.shorten(this.url.fullUrl).subscribe((s:any) => {
      const tinyUrl ={
        full:this.url.fullUrl,
        short:s
      }
      this.service.postUrl(tinyUrl).pipe(delay(100)).subscribe((res:any) => {
        this.urlId = res["url"]._id;
      });
      setTimeout(() => {
        this.service.getShortUrl(this.urlId).subscribe((short: any) => {
          this.getShortUrl = short["result"];
          this.loader = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
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
        })
      },1000);

    })


    }else{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Plase Enter Valid URL...'
      })
    }


  }
}
