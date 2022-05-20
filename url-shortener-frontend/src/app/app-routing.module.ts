import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlShortnerComponent } from './url-shortner/url-shortner.component';

const routes: Routes = [
  {path:'',redirectTo:'/url-shortner',pathMatch:'full'},
  {path:'url-shortner',component:UrlShortnerComponent},
  {path:'short-url',redirectTo:'/',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
