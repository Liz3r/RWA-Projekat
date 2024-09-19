import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}


  async findAll() {
    let categories = await this.categoryRepository.find();
    if(!categories)
      throw new HttpException('No categories found', HttpStatus.NO_CONTENT);
    return categories.map((category) => {let categ:CategoryDto = {id: category.id, title: category.categoryTitle}; return categ;});
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
