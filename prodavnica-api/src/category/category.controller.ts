import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SkipAuth } from 'src/auth/constants';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @SkipAuth()
  @Get('getAllCategories')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }


}
