import { IsDefined, IsString, IsNotEmpty,IsIn } from 'class-validator';

export class UpdateUserDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    roomId: number;
}
