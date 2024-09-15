import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from 'src/user/entities/announcement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService {

    constructor(
        @InjectRepository(Announcement)
        private readonly announcementRepository: Repository<Announcement>
      ){}

    
    allAnnouncementsGetPage(){
        this.announcementRepository.createQueryBuilder("Announcement").orderBy("id").limit(15);
    }
}
