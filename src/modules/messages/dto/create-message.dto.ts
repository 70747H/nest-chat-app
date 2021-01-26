import {IsDefined, IsString, IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  roomId: number;
}
