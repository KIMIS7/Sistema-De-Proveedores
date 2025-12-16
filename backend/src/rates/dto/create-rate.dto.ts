import {IsString,IsNumber,IsDateString, Length} from 'class-validator';

export class CreateRateDto {

    @IsNumber()
    price: number;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsString()
    @Length(3,10)
    currency: string;

    @IsNumber()
    serviceId: number;
}
