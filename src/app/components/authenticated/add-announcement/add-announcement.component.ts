import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.scss'
})
export class AddAnnouncementComponent {

  constructor(private router:Router){}

  onLogoClick(){
    this.router.navigate(['authenticated/home']);
  }
}
