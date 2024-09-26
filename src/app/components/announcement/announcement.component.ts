import { Component, Input } from '@angular/core';
import { API_URL } from '../../env';
import { Announcement } from '../../../models/announcement';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent {

  @Input() announcement!: Announcement;
  @Input() prev!: String;
  @Input() deleted!: ()=>void;

  current!: any;

  confirmDel = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
  }

  // deleteItem():void{
  //   this.http.delete(`${API_URL}/deleteItem/${this.announcement.id}`, {withCredentials: true})
  //   .subscribe(res=>{
  //     console.log(res);
  //     this.deleted();
  //   })
  // }

  fixTitle(text:String):String{
    if(text.length > 25){
      return text.slice(0,61) + "...";
    }
    return text;
  }

  fixDescription(text:String):String{
    if(text.length > 60){
      return text.slice(0,90) + "...";
    }
    return text;
  }

  priceToString(): String{
    var retPrice = '';
    var priceStr = this.announcement.price.toString();
    var strArr = [];
    if(priceStr.length > 3){
      while(priceStr.length > 3){
        strArr.push(priceStr.slice(priceStr.length-3));
        priceStr = priceStr.slice(0, priceStr.length-3);
      }

      retPrice = priceStr + ".";

      while(strArr.length > 1){
        retPrice += strArr.pop() + ".";
      }
      retPrice += strArr.pop() + " " + this.announcement.currency;
    }else{
      retPrice = priceStr + " " + this.announcement.currency;
    }

    return retPrice;
  }

 
}
