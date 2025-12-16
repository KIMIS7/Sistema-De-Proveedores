import {IsString,IsNumber,IsBoolean,IsOptional, Length,} from 'class-validator';

export class CreateServiceDto {

    @IsString()
    @Length(3,100)
    name: string;

    @IsString()
    @Length(5,500)
    description: string;

    @IsBoolean()
    @IsOptional()
    isActive?: Boolean;

    @IsNumber()
    providerId: number;

}
