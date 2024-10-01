import { Injectable } from '@angular/core';
import { Announcement } from '../../models/announcement';
import { map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';
import { AnnouncementDetails } from '../../models/announcement-details';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  getAnnouncementsPageAll(pageNum: number, itemsPerPageNum: number): Observable<{announcements: Announcement[], count: number}>{
    return this.http.get<{announcements: Announcement[], count: number}>
    (`${API_URL}/announcement/getPageInAllAnnouncements/${pageNum}/${itemsPerPageNum}`,
       {withCredentials: true, params: {page: pageNum, itemsPerPage: itemsPerPageNum}});
  }
  getAnnouncementsPageCategory(pageNum: number, itemsPerPageNum: number, categoryId: number | null): Observable<{announcements: Announcement[], count: number}>{
    return this.http.get<{announcements: Announcement[], count: number}>
    (`${API_URL}/announcement/getPageInCategory/${pageNum}/${itemsPerPageNum}/${categoryId}`,
       {withCredentials: true});
  }

  getAnnouncementsPageSearch(pageNum: number, itemsPerPageNum: number, categoryId: number | null, search: string | null): Observable<{announcements: Announcement[], count: number}>{
    let srcFix = search === ''? null : search;
    return this.http.get<{announcements: Announcement[], count: number}>
    (`${API_URL}/announcement/getPageInSearch/${pageNum}/${itemsPerPageNum}/${categoryId}/${srcFix}`,
       {withCredentials: true});
  }

  getAnnouncementDetails(announcementId: number): Observable<AnnouncementDetails>{
    console.log(announcementId);
    return this.http.get<AnnouncementDetails>(`${API_URL}/announcement/details/${announcementId}`, {withCredentials: true});
  }
}
