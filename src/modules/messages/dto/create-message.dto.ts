import { IsDefined, IsString, IsNotEmpty, IsIn, IsOptional, IsNumber } from 'class-validator';

export class CreateMessageDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    roomId: number;
}
