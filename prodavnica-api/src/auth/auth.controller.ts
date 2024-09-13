import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './constants';
import { SignInDto } from 'src/user/dto/signIn.dto';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService
    ){}

    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res({passthrough: true}) response: Response){
        const res = await this.authService.signIn(signInDto.user_email, signInDto.user_password);
        response.cookie('jwt', res.token);
        response.send(res);
    }

    @HttpCode(HttpStatus.OK)
    @Get('checkToken')
    async checkToken(@Request() req){
        if(!req.payload.email)
            throw new HttpException('Invalid payload', HttpStatus.BAD_REQUEST);
        const payload = {...req.payload}
        const user = await this.userService.findOneByEmail(req.payload.email);
        if(payload.id !== user.id || payload.first_name !== user.first_name)
            throw new HttpException('Invalid payload', HttpStatus.BAD_REQUEST);
        
        return { user_id: user.id,user_email: user.user_email,user_firstname: user.first_name};
    }
}
