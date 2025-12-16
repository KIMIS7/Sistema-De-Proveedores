import {IsString,IsEmail,IsBoolean,IsOptional, Length} from 'class-validator'

export class CreateProviderDto {

    @IsString()
    @Length(3,100)
    name: string;

    @IsEmail()
    contactEmail: string;

    @IsString()
    @Length(10)
    phone: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;



}
