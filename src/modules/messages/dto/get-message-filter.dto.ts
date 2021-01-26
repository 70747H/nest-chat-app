import {IsOptional, IsDefined, IsNotEmpty, IsNumber} from 'class-validator';
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class GetMessageFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Transform(parseInt)
  userId: number;

  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Transform(parseInt)
  roomId: number;
}
