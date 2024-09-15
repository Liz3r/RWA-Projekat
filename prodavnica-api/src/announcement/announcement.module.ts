import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from 'src/user/entities/announcement.entity';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  imports: [TypeOrmModule.forFeature([Announcement])],
  exports: [AnnouncementService]
})
export class AnnouncementModule {}
