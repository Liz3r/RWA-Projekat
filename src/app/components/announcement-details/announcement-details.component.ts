import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { clearDetailsSelection, loadAnnouncementDetails } from '../../store/announcement-details.ts/announcement-details.actions';
import { selectAnnouncementDetails } from '../../store/announcement-details.ts/announcement-details.selector';
import { AnnouncementDetails } from '../../../models/announcement-details';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrl: './announcement-details.component.scss'
})
export class AnnouncementDetailsComponent implements OnInit, OnDestroy{

  

  announcement!: AnnouncementDetails | null;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>){}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id && !Number.isNaN(id))
      this.store.dispatch(loadAnnouncementDetails({id: Number(id)}))
    this.store.select(selectAnnouncementDetails).subscribe((announcement) => {
        this.announcement = announcement;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearDetailsSelection());
  }

  getDateString(datep: Date): string{

    let date = new Date(datep);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  }

  onLogoClick(){
    this.router.navigate(['authenticated/home']);
  }

}
