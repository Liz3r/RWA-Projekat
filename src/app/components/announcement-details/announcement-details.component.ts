import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { loadAnnouncementDetails } from '../../store/announcement-details.ts/announcement-details.actions';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrl: './announcement-details.component.scss'
})
export class AnnouncementDetailsComponent implements OnInit{



  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>){}


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id && !Number.isNaN(id))
      this.store.dispatch(loadAnnouncementDetails({id: Number(id)}))
  }

  onLogoClick(){
    this.router.navigate(['authenticated/home']);
  }

}
