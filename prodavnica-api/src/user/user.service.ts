import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    
    const getUser = this.userRepository.findOneBy({user_email: createUserDto.user_email})

    const salt = await bcrypt.genSalt(10);
    const password = createUserDto.user_password;
    const hashPassword = await bcrypt.hash(password, salt);

    //provera da li neko sa tim emailom postoji

    getUser.then( user => {
      if(user)
        throw new HttpException('User already exists', 409);

      const newUser = new User();
      newUser.user_email = createUserDto.user_email;
      newUser.user_password = hashPassword;
      newUser.first_name = createUserDto.first_name;
      newUser.last_name = createUserDto.last_name;
      newUser.phone_number = createUserDto.phone_number;
      newUser.country = createUserDto.country;
      newUser.city = createUserDto.city;
      
      const createdUser = this.userRepository.create(newUser);
      return this.userRepository.save(createdUser);
    })
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ user_email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
