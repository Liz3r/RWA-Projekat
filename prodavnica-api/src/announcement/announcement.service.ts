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
import { RetAnnouncementDto } from './dto/return-announcement.dto';

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

  async findPageInAllAnnouncements(page: number, pageSize:number) {

    if(!page)
      throw new HttpException('no page provided', HttpStatus.BAD_REQUEST)

    let [announcements, count] = await this.announcementRepository
    .createQueryBuilder('announcements')
    .orderBy('id').skip(page*pageSize)
    .take(pageSize)
    .getManyAndCount();

    return {announcements: announcements.map(announcement => ({...announcement, page: page})), count: count};
  }

  async findPageInCategory(page: number, pageSize: number, categoryId: number){
    let [announcements, count] = await this.announcementRepository
    .createQueryBuilder('announcement')
    .where('announcement.categoryId = :categId')
    .orderBy('id')
    .skip(page*pageSize)
    .take(pageSize)
    .setParameters({categId: categoryId})
    .getManyAndCount();

    return {announcements: announcements.map(announcement => ({...announcement, page: page})), count: count};
  }

  async findPageInSearchWithCategory(page: number, pageSize: number, categoryId: number | null, search: string){

      let [announcements, count] = await this.announcementRepository
      .createQueryBuilder('announcement')
      .where('announcement.categoryId = :categId')
      .andWhere('announcement.title like :searchString')
      .orderBy('id')
      .skip(page*pageSize)
      .take(pageSize)
      .setParameters({categId: categoryId, searchString: `%${search}%`})
      .getManyAndCount();
    
    return {announcements: announcements.map(announcement => ({...announcement, page: page})), count: count};
  }

  async findPageInSearchWithoutCategory(page: number, pageSize: number, search: string){

    let [announcements, count] = await this.announcementRepository
    .createQueryBuilder('announcement')
    .where('announcement.title like :searchString')
    .orderBy('id')
    .skip(page*pageSize)
    .take(pageSize)
    .setParameters({searchString: `%${search}%`})
    .getManyAndCount();
  
  return {announcements: announcements.map(announcement => ({...announcement, page: page})), count: count};
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
