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
import { AnnouncementDetailsDto } from './dto/announcement-details.dto';

@Injectable()
export class AnnouncementService {

  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
    private userService: UserService
  ){}

  
  async getAnnouncementDetails(announcementId: number){
    const announcement = await this.announcementRepository
    .createQueryBuilder('announcement')
    .leftJoinAndSelect('announcement.user', 'user')
    .leftJoinAndSelect('announcement.category', 'category')
    .where('announcement.id = :id', { id: announcementId })
    .getOne();

    if(!announcement)
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    if(!announcement.category)
      throw new HttpException('Invalid announcement', HttpStatus.NOT_FOUND);
    if(!announcement.user)
      throw new HttpException('User no longer exists', HttpStatus.NOT_FOUND);
    
    const announcementDetailed: AnnouncementDetailsDto = {
      //info o korisniku
      user_firstname: announcement.user.first_name,
      user_lastname: announcement.user.last_name,
      user_email: announcement.user.user_email,
      user_phone_number: announcement.user.phone_number,
      user_country: announcement.user.country,
      user_city: announcement.user.city,
      user_address: announcement.user.address,
      user_bio: announcement.user.bio,
      //kategorija
      category: announcement.category.categoryTitle,
      //osnovni info o oglasu
      id: announcement.id,
      title: announcement.title,
      condition: announcement.condition,
      currency: announcement.currency,
      datePosted: announcement.datePosted,
      description: announcement.description,
      price: announcement.price,
      picture: announcement.picture
    }
    

    return announcementDetailed;
  }

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

    if(!userExists.first_name || userExists.first_name == null || userExists.first_name === 'null',
      !userExists.last_name || userExists.last_name == null || userExists.last_name === 'null',
      !userExists.phone_number || userExists.phone_number == null || userExists.phone_number === 'null',
      !userExists.country || userExists.country == null || userExists.country === 'null',
      !userExists.city || userExists.city == null || userExists.city === 'null',
      !userExists.address || userExists.address == null || userExists.address === 'null')
      throw new HttpException('Please finish setting up your account before posting', HttpStatus.FORBIDDEN);

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
