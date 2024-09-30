import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, Request} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipAuth } from 'src/auth/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipAuth()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
     const response = this.userService.create(createUserDto);
     return response;
  }

  @Get('allUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Get('byId')
  findOne(@Request() req) {
    const id = req.payload.id;
    if(!id)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.userService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
