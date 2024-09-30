import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(75)
    readonly user_email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(75)
    readonly first_name: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(75)
    readonly last_name: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(250)
    readonly bio: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(75)
    readonly phone_number: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(56)
    readonly country: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    readonly city: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(60)
    readonly address: string;

}
