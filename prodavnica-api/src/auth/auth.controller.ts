import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './constants';
import { SignInDto } from 'src/user/dto/signIn.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto.user_email, signInDto.user_password);
    }
}
