import { IsEmail, IsNotEmpty, NotContains, notEquals, NotEquals } from "class-validator";

export class AnnouncementDetailsDto  {

    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    condition: string;
    @IsNotEmpty()
    currency: string;
    @IsNotEmpty()
    datePosted: Date;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    picture: string;
    @IsNotEmpty()
    category: string;
    @IsNotEmpty()
    @NotEquals('null')
    @IsEmail()
    user_email: string;
    @IsNotEmpty()
    @NotEquals('null')
    user_firstname: string;
    @IsNotEmpty()
    @NotEquals('null')
    user_lastname: string;
    @IsNotEmpty()
    @NotEquals('null')
    user_bio: string;
    @IsNotEmpty()
    @NotEquals('null')
    user_phone_number: string;
    @IsNotEmpty()
    @NotEquals('null')
    user_country: string;
    @IsNotEmpty()
    @NotEquals('null')
    user_city: string;
    @IsNotEmpty()
    @NotEquals('null')
    user_address: string;
}