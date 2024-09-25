import { Injectable } from '@angular/core';
import { Announcement } from '../../models/announcement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  getAnnouncementsPageAll(pageNum: number, itemsPerPageNum: number): Observable<Announcement[]>{
    return this.http.get<Announcement[]>(`${API_URL}/announcements/all`, {withCredentials: true, params: {page: pageNum, itemsPerPage: itemsPerPageNum}});
  }
}
