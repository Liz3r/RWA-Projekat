import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrl: './announcement-details.component.scss'
})
export class AnnouncementDetailsComponent implements OnInit{



  constructor(private route: ActivatedRoute, private router: Router){}


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }

  onLogoClick(){
    this.router.navigate(['authenticated/home']);
  }

}
