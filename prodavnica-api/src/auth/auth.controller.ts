import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './constants';
import { SignInDto } from 'src/user/dto/signIn.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res({passthrough: true}) response: Response){
        const res = await this.authService.signIn(signInDto.user_email, signInDto.user_password);
        response.cookie('jwt', res.token);
        response.send(res);
    }
}
