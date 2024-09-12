import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly user_email: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly user_password: string;

    @IsNotEmpty()
    readonly first_name: string;

    @IsNotEmpty()
    readonly last_name: string;
}
