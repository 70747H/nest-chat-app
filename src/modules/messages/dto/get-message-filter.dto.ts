import { IsOptional, IsIn, IsDefined, IsString, IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';
import {Transform} from "class-transformer";

export class GetMessageFilterDto {
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Transform(parseInt)
  userId: number;

  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Transform(parseInt)
  roomId: number;
}
