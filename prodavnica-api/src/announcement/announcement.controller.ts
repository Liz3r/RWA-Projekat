import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, HttpException, HttpStatus, Request } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { SkipAuth } from 'src/auth/constants';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { StringToNumber } from 'src/helpers/helpers';


@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post('newAnnouncement')
  @UseInterceptors(FileInterceptor('picture'))
  create(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1024*1024 }),
      new FileTypeValidator({ fileType: 'image/jpeg' }),
    ],
  })) file: Express.Multer.File, @Body() body: CreateAnnouncementDto, @Request() req) {
    const fileUrl = `http://localhost:3000/uploads/${file.filename}`; 
    const userId = req.payload.id;
    return this.announcementService.create(body, userId, fileUrl);;
  }

  @Get('getPageInAllAnnouncements/:page/:pageSize')
  findAll(@Param('page') page: number, @Param('pageSize') pageSize: number) {
    return this.announcementService.findPageInAllAnnouncements(page, pageSize);
  }
  @Get('getPageInCategory/:page/:pageSize/:categoryId')
  findCategory(@Param('page') page: number, @Param('pageSize') pageSize: number, @Param('categoryId') categ) {
    //console.log(categ == 'null');
    if(categ === 'null')
      return this.announcementService.findPageInAllAnnouncements(page, pageSize);
     return this.announcementService.findPageInCategory(page, pageSize, categ);
  }

  @Get('getPageInSearch/:page/:pageSize/:categoryId/:search')
  findSearch(@Param('page') page: number, @Param('pageSize') pageSize: number, @Param('categoryId') categ, @Param('search') search) {

    if(categ === 'null' && !(search === 'null' || search === '')){
      return this.announcementService.findPageInSearchWithoutCategory(page, pageSize, search);
    }
    if(categ !== 'null' && (search === 'null' || search === '')){
      return this.announcementService.findPageInCategory(page, pageSize, categ);
    }
    if(categ !== 'null' && (search === 'null' || search === '')){
      return this.announcementService.findPageInAllAnnouncements(page, pageSize);
    }

    return this.announcementService.findPageInSearchWithCategory(page, pageSize, categ, search);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcementService.update(+id, updateAnnouncementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementService.remove(+id);
  }
}
