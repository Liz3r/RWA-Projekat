import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { access } from 'fs';

@Injectable()
export class AuthService {

    constructor( 
        private userService: UserService,
        private jwtService: JwtService
    ){}
    
    public async signIn(email: string, password: string){

        let user = await this.userService.findOneByEmail(email);
        
        if(!user){
            throw new HttpException('User with given name does not exist', 404);
        }

        const isCorrect = await bcrypt.compare(password, user.user_password);
        if(!isCorrect)
            throw new HttpException('Invalid password', 401);
        
        const payload = { id: user.id ,email: user.user_email};
        return {
            access_token: this.jwtService.signAsync(payload)
        }
    }
}
