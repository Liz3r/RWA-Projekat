import { Injectable } from '@angular/core';
import { Announcement } from '../../models/announcement';
import { map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  getAnnouncementsPageAll(pageNum: number, itemsPerPageNum: number): Observable<{announcements: Announcement[], count: number}>{
    return this.http.get<{announcements: Announcement[], count: number}>(`${API_URL}/announcement/getPageInAllAnnouncements/${pageNum}/${itemsPerPageNum}`, {withCredentials: true, params: {page: pageNum, itemsPerPage: itemsPerPageNum}});
  }
}
