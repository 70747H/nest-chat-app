import {IsDefined, IsString, IsNotEmpty, IsIn} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ required: false })
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  roomId: number;
}
