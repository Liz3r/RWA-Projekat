import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { error } from 'console';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}


  async create(createUserDto: CreateUserDto) {
    
    const user = await this.userRepository.findOneBy({user_email: createUserDto.user_email})

    const salt = await bcrypt.genSalt(10);
    const password = createUserDto.user_password;
    const hashPassword = await bcrypt.hash(password, salt);

    
      if(user)
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      

      const newUser = new User();
      newUser.user_email = createUserDto.user_email;
      newUser.user_password = hashPassword;
      newUser.first_name = createUserDto.first_name;
      newUser.last_name = createUserDto.last_name;
      newUser.bio = 'null';
      newUser.city = 'null';
      newUser.country = 'null';
      newUser.address = 'null';
      newUser.phone_number = 'null';
      
      const createdUser = this.userRepository.create(newUser);
      await this.userRepository.save(createdUser);
    
      return {message: 'User created'};
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  findOneByEmail(email: string): Promise<User> {
    if(email)
      return this.userRepository.findOneBy({ user_email: email });
    throw new HttpException('No email provided', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
