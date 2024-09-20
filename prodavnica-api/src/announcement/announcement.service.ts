import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './entities/announcement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StringToNumber } from 'src/helpers/helpers';
import { UserService } from 'src/user/user.service';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AnnouncementService {

  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
    private userService: UserService
  ){}

  async create(body: CreateAnnouncementDto, userId: number, fileUrl: string) {
    if(!body.title || !body.category || !body.condition || !body.currency || !body.description || !body.price || 
      typeof(body.title) !== 'string' || typeof(body.category) !== 'string' || typeof(body.condition) !== 'string' 
      || typeof(body.currency) !== 'string' || typeof(body.description) !== 'string' || typeof(body.price) !== 'string')
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
  
    const priceNum = StringToNumber(body.price);
    const categoryNum = StringToNumber(body.category);
    if(!priceNum || !categoryNum)
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);

    let userExists = await this.userService.findOneById(userId);

    if(!userExists)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const currentDate = new Date(Date.now());
    const announcement = new Announcement();

    const categoryRel = new Category();
    const userRel = new User();

    categoryRel.id = categoryNum;
    userRel.id = userId

    announcement.title = body.title
    announcement.category = categoryRel
    announcement.condition = body.condition
    announcement.currency = body.currency
    announcement.datePosted = currentDate
    announcement.price = priceNum
    announcement.user = userRel
    announcement.description = body.description
    announcement.picture = fileUrl
    //announcement.

    const createdAnnouncement =  this.announcementRepository.create(announcement);
    await this.announcementRepository.save(createdAnnouncement);

    return {message: 'Announcement created'};
  }

  findAll() {
    return `This action returns all announcement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return `This action updates a #${id} announcement`;
  }

  remove(id: number) {
    return `This action removes a #${id} announcement`;
  }
}
